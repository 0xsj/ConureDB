package graphdb

import Model._
import com.typesafe.scalalogging.LazyLogging
import graphdb.Persistence

/** Main entry point for the graph database application
  */
object Main extends LazyLogging {
  def main(args: Array[String]): Unit = {
    logger.info("Starting ScalaGraphDB - A Simple Graph Database")

    // Create a new graph
    val graph       = new Graph()
    val queryEngine = new QueryEngine(graph)
    val persistence = new Persistence(graph)

    // Run the demo
    runDemo(graph, queryEngine, persistence)

    logger.info("ScalaGraphDB demo completed")
  }

  /** Helper to convert GraphResult to string */
  private def resultToString[T](result: GraphResult[T]): String = result match {
    case Success(value) => value.toString
    case Failure(msg) => s"Failed: $msg"
  }

  /** Runs a demonstration of the graph database features
    */
  def runDemo(graph: Graph, queryEngine: QueryEngine, persistence: Persistence): Unit = {
    println("\n=== ScalaGraphDB Demo ===\n")

    // 1. Create nodes
    println("CREATING NODES:")
    println("----------------")

    val alice   = createPerson(graph, "Alice", 30, Set("Developer", "Designer"))
    val bob     = createPerson(graph, "Bob", 35, Set("Manager"))
    val charlie = createPerson(graph, "Charlie", 28, Set("Developer"))
    val dave    = createPerson(graph, "Dave", 40, Set("CEO"))

    val projectA = createProject(graph, "ProjectA", "Mobile App")
    val projectB = createProject(graph, "ProjectB", "Website Redesign")

    println(s"Created node: $alice")
    println(s"Created node: $bob")
    println(s"Created node: $charlie")
    println(s"Created node: $dave")
    println(s"Created node: $projectA")
    println(s"Created node: $projectB")

    // 2. Create relationships
    println("\nCREATING RELATIONSHIPS:")
    println("---------------------")

    val rel1 = graph.createRelationship(alice.id, bob.id, "REPORTS_TO", Map("since" -> 2021))
    val rel2 = graph.createRelationship(charlie.id, bob.id, "REPORTS_TO", Map("since" -> 2022))
    val rel3 = graph.createRelationship(bob.id, dave.id, "REPORTS_TO", Map("since" -> 2020))

    val rel4 = graph.createRelationship(
      alice.id,
      projectA.id,
      "WORKS_ON",
      Map("role" -> "Lead Developer", "started" -> "2023-01-15")
    )
    val rel5 = graph.createRelationship(
      alice.id,
      projectB.id,
      "WORKS_ON",
      Map("role" -> "Designer", "started" -> "2023-03-10")
    )
    val rel6 = graph.createRelationship(
      charlie.id,
      projectA.id,
      "WORKS_ON",
      Map("role" -> "Developer", "started" -> "2023-02-01")
    )
    val rel7 = graph.createRelationship(bob.id, projectB.id, "MANAGES", Map("priority" -> "High"))

    println(s"Created relationship: ${resultToString(rel1)}")
    println(s"Created relationship: ${resultToString(rel2)}")
    println(s"Created relationship: ${resultToString(rel3)}")
    println(s"Created relationship: ${resultToString(rel4)}")
    println(s"Created relationship: ${resultToString(rel5)}")
    println(s"Created relationship: ${resultToString(rel6)}")
    println(s"Created relationship: ${resultToString(rel7)}")

    // 3. Query operations
    println("\nQUERY OPERATIONS:")
    println("----------------")

    // Find all people
    val people = queryEngine.findNodes(
      QueryEngine.NodePattern(labels = Set("Person"))
    )
    println(s"Found ${people.size} people: ${people.map(_.properties("name")).mkString(", ")}")

    // Find all developers
    val developers = queryEngine.findNodes(
      QueryEngine.NodePattern(labels = Set("Person", "Developer"))
    )
    println(
      s"Found ${developers.size} developers: ${developers.map(_.properties("name")).mkString(", ")}"
    )

    // Find Alice's projects
    graph.getNode(alice.id) match {
      case Success(aliceNode) =>
        graph.getOutgoingRelationships(alice.id, Some("WORKS_ON")) match {
          case Success(rels) =>
            val projects = rels.flatMap { rel =>
              graph.getNode(rel.targetId) match {
                case Success(project) => Some(project)
                case _                => None
              }
            }
            println(
              s"Alice works on ${projects.size} projects: ${projects.map(_.properties("name")).mkString(", ")}"
            )

          case _ => println("Failed to get Alice's relationships")
        }
      case _ => println("Failed to get Alice's node")
    }

    // Find reporting hierarchy
    println("\nReporting hierarchy:")

    def printReportingChain(personId: ID, level: Int = 0): Unit = {
      graph.getNode(personId) match {
        case Success(person) =>
          val indent = "  " * level
          println(s"$indent${person.properties("name")}")

          graph.getIncomingRelationships(personId, Some("REPORTS_TO")) match {
            case Success(reports) =>
              reports.foreach { rel =>
                printReportingChain(rel.sourceId, level + 1)
              }
            case _ => // No reports
          }
        case _ => // Invalid person
      }
    }

    printReportingChain(dave.id)

    // 4. Path finding
    println("\nPATH FINDING:")
    println("------------")

    val paths = queryEngine.findPaths(
      QueryEngine.NodePattern(Set("Person"), Map("name" -> "Charlie")),
      QueryEngine.NodePattern(Set("Person"), Map("name" -> "Dave")),
      QueryEngine.RelationshipPattern(Set("REPORTS_TO"), Map.empty, QueryEngine.Direction.OUTGOING),
      5
    )

    println(s"Found ${paths.size} paths from Charlie to Dave:")
    paths.foreach { path =>
      val pathStr = path.elements
        .map {
          case Left(node) => node.properties("name").toString
          case Right(rel) => s"-[${rel.relationType}]->"
        }
        .mkString(" ")
      println(s"  $pathStr")
    }

    // 5. Persistence
    println("\nPERSISTENCE:")
    println("-----------")

    val saveResult = persistence.saveToFile("data/graph.db")
    println(s"Saved graph to file: $saveResult")

    // Clear the graph
    graph.clear()
    println(s"Cleared graph. Node count: ${graph.nodeCount}")

    // Load from file
    val loadResult = persistence.loadFromFile("data/graph.db")
    println(s"Loaded graph from file: $loadResult")
    println(
      s"After loading - Node count: ${graph.nodeCount}, Relationship count: ${graph.relationshipCount}"
    )

    // Export to JSON
    val exportResult = persistence.exportToJson("data/graph.json")
    println(s"Exported graph to JSON: $exportResult")

    // 6. Graph statistics
    println("\nGRAPH STATISTICS:")
    println("----------------")
    println(s"Total nodes: ${graph.nodeCount}")
    println(s"Total relationships: ${graph.relationshipCount}")
    println(s"Person nodes: ${graph.nodeLabelCount("Person")}")
    println(s"Project nodes: ${graph.nodeLabelCount("Project")}")
    println(s"REPORTS_TO relationships: ${graph.relationshipTypeCount("REPORTS_TO")}")
    println(s"WORKS_ON relationships: ${graph.relationshipTypeCount("WORKS_ON")}")
  }

  /** Helper to create a person node
    */
  private def createPerson(
      graph: Graph,
      name: String,
      age: Int,
      roles: Set[String] = Set.empty
  ): Node = {
    val labels     = Set("Person") ++ roles
    val properties = Map("name" -> name, "age" -> age)
    graph.createNode(labels, properties) match {
      case Success(node) => node
      case Failure(msg) =>
        logger.error(s"Failed to create person node: $msg")
        throw new RuntimeException(s"Failed to create person node: $msg")
    }
  }

  /** Helper to create a project node
    */
  private def createProject(graph: Graph, name: String, description: String): Node = {
    val labels = Set("Project")
    val properties = Map(
      "name"        -> name,
      "description" -> description,
      "created"     -> java.time.LocalDate.now().toString
    )
    graph.createNode(labels, properties) match {
      case Success(node) => node
      case Failure(msg) =>
        logger.error(s"Failed to create project node: $msg")
        throw new RuntimeException(s"Failed to create project node: $msg")
    }
  }
}