package graphdb

import Model._
import scala.collection.mutable
import com.typesafe.scalalogging.LazyLogging

/**
 * Query engine for graph database that provides more complex query operations
 */
class QueryEngine(graph: Graph) extends LazyLogging {
  import QueryEngine._
  
  /**
   * Finds nodes matching the given pattern
   * 
   * @param pattern Node pattern to match
   * @return Set of matching nodes
   */
  def findNodes(pattern: NodePattern): Set[Node] = {
    val candidateNodes = if (pattern.labels.nonEmpty) {
      // Start with nodes matching at least one label
      pattern.labels.flatMap(graph.findNodesByLabel).toSet
    } else {
      // If no labels specified, consider all nodes
      graph.getNodes
    }
    
    // Filter by properties
    candidateNodes.filter { node =>
      pattern.properties.forall { case (key, value) =>
        node.properties.get(key).contains(value)
      }
    }
  }
  
  /**
   * Finds paths between nodes matching start and end patterns
   * 
   * @param startPattern Pattern for start nodes
   * @param endPattern Pattern for end nodes
   * @param relationshipPattern Pattern for relationships along the path
   * @param maxDepth Maximum path length
   * @return Set of matching paths
   */
  def findPaths(
    startPattern: NodePattern,
    endPattern: NodePattern,
    relationshipPattern: RelationshipPattern = RelationshipPattern(),
    maxDepth: Int = 10
  ): Set[Path] = {
    val startNodes = findNodes(startPattern)
    val endNodes = findNodes(endPattern)
    
    val allPaths = for {
      startNode <- startNodes
      endNode <- endNodes
      if startNode.id != endNode.id
    } yield {
      findPath(startNode.id, endNode.id, relationshipPattern, maxDepth)
    }
    
    allPaths.flatten
  }
  
  /**
   * Finds a path between two specific nodes
   * 
   * @param startNodeId ID of the start node
   * @param endNodeId ID of the end node
   * @param relationshipPattern Pattern for relationships along the path
   * @param maxDepth Maximum path length
   * @return Option containing a matching path if found
   */
  def findPath(
    startNodeId: ID,
    endNodeId: ID,
    relationshipPattern: RelationshipPattern = RelationshipPattern(),
    maxDepth: Int = 10
  ): Set[Path] = {
    val result = mutable.Set[Path]()
    val visited = mutable.Set[ID]()
    
    def dfs(currentId: ID, currentPath: List[Either[Node, Relationship]], depth: Int): Unit = {
      if (depth > maxDepth) return
      
      graph.getNode(currentId) match {
        case Success(currentNode) =>
          val updatedPath = currentPath :+ Left(currentNode)
          
          if (currentId == endNodeId) {
            result += Path(updatedPath)
            return
          }
          
          if (visited.contains(currentId)) return
          visited += currentId
          
          // Get relationships based on direction
          val allRels = relationshipPattern.direction match {
            case Direction.OUTGOING => 
              graph.getOutgoingRelationships(currentId) match {
                case Success(rels) => rels
                case _ => Set.empty
              }
            case Direction.INCOMING => 
              graph.getIncomingRelationships(currentId) match {
                case Success(rels) => rels
                case _ => Set.empty
              }
            case Direction.BOTH =>
              val outRels = graph.getOutgoingRelationships(currentId) match {
                case Success(rels) => rels
                case _ => Set.empty
              }
              val inRels = graph.getIncomingRelationships(currentId) match {
                case Success(rels) => rels
                case _ => Set.empty
              }
              outRels ++ inRels
          }
          
          // Filter relationships by type and properties
          val matchingRels = allRels.filter { rel =>
            val typeMatches = relationshipPattern.types.isEmpty || 
                            relationshipPattern.types.contains(rel.relationType)
            
            val propMatches = relationshipPattern.properties.forall { case (key, value) =>
              rel.properties.get(key).contains(value)
            }
            
            typeMatches && propMatches
          }
          
          // Continue search along matching relationships
          for (rel <- matchingRels) {
            val nextNodeId = if (rel.sourceId == currentId) rel.targetId else rel.sourceId
            if (!visited.contains(nextNodeId)) {
              dfs(nextNodeId, updatedPath :+ Right(rel), depth + 1)
            }
          }
          
          visited -= currentId
          
        case _ => // Node not found, do nothing
      }
    }
    
    dfs(startNodeId, List.empty, 0)
    result.toSet
  }
}

/**
 * Companion object for QueryEngine with pattern classes
 */
object QueryEngine {
  /**
   * A match pattern for nodes
   */
  case class NodePattern(
    labels: Set[String] = Set.empty,
    properties: Map[String, Any] = Map.empty
  )
  
  /**
   * A match pattern for relationships
   */
  case class RelationshipPattern(
    types: Set[String] = Set.empty,
    properties: Map[String, Any] = Map.empty,
    direction: Direction = Direction.OUTGOING
  )
  
  /**
   * Relationship direction
   */
  sealed trait Direction
  object Direction {
    case object OUTGOING extends Direction
    case object INCOMING extends Direction
    case object BOTH extends Direction
  }
  
  /**
   * A path in the graph
   */
  case class Path(elements: List[Either[Node, Relationship]]) {
    def startNode: Option[Node] = elements.headOption.flatMap {
      case Left(node) => Some(node)
      case _ => None
    }
    
    def endNode: Option[Node] = elements.lastOption.flatMap {
      case Left(node) => Some(node)
      case _ => None
    }
    
    def length: Int = elements.count(_.isRight) // Number of relationships
    
    def nodes: List[Node] = elements.collect { case Left(node) => node }
    
    def relationships: List[Relationship] = elements.collect { case Right(rel) => rel }
  }
}