package graphdb

import Model._

object Main {
  def main(args: Array[String]): Unit = {
    println("ScalaGraphDB - A Simple Graph Database")
    
    // Create a new graph
    val graph = new Graph()
    
    // Create some nodes
    println("\nCreating nodes...")
    val alice = graph.createNode(Set("Person"), Map("name" -> "Alice", "age" -> 30))
    val bob = graph.createNode(Set("Person"), Map("name" -> "Bob", "age" -> 32))
    val charlie = graph.createNode(Set("Person"), Map("name" -> "Charlie", "age" -> 25))
    
    println(s"Created node: $alice")
    println(s"Created node: $bob")
    println(s"Created node: $charlie")
    
    // Create some relationships
    println("\nCreating relationships...")
    val rel1 = graph.createRelationship(alice.id, bob.id, "KNOWS", Map("since" -> 2018))
    val rel2 = graph.createRelationship(bob.id, charlie.id, "WORKS_WITH", Map("project" -> "GraphDB"))
    
    println(s"Created relationship: $rel1")
    println(s"Created relationship: $rel2")
    
    // Get node relationships
    println("\nRetrieving relationships...")
    val bobRels = graph.getNodeRelationships(bob.id)
    println(s"Bob's relationships: $bobRels")
    
    // Graph stats
    println("\nGraph statistics:")
    println(graph)
  }
}
