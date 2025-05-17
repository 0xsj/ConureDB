package graphdb

import Model._
import scala.collection.mutable

class Graph {
  private val nodes = mutable.Map[ID, Node]()
  private val relationships = mutable.Map[ID, Relationship]()
  private val nodeRelationships = mutable.Map[ID, mutable.Set[ID]]().withDefaultValue(mutable.Set.empty[ID])
  
  // Node operations
  def createNode(labels: Set[String] = Set.empty, properties: Properties = Map.empty): Node = {
    val id = generateId("node")
    val node = Node(id, labels, properties)
    nodes(id) = node
    nodeRelationships(id) = mutable.Set.empty[ID]
    node
  }
  
  def getNode(id: ID): Option[Node] = nodes.get(id)
  
  def updateNode(id: ID, labels: Set[String], properties: Properties): Option[Node] = {
    nodes.get(id).map { _ =>
      val updatedNode = Node(id, labels, properties)
      nodes(id) = updatedNode
      updatedNode
    }
  }
  
  def deleteNode(id: ID): Option[Node] = {
    // First check if node has relationships
    if (nodeRelationships(id).nonEmpty) {
      throw new IllegalStateException(s"Cannot delete node $id as it has existing relationships")
    }
    
    val node = nodes.remove(id)
    nodeRelationships.remove(id)
    node
  }
  
  // Relationship operations
  def createRelationship(sourceId: ID, targetId: ID, relationType: String, properties: Properties = Map.empty): Relationship = {
    if (!nodes.contains(sourceId) || !nodes.contains(targetId)) {
      throw new IllegalArgumentException(s"Source node $sourceId or target node $targetId does not exist")
    }
    
    val id = generateId("rel")
    val relationship = Relationship(id, sourceId, targetId, relationType, properties)
    relationships(id) = relationship
    nodeRelationships(sourceId) += id
    nodeRelationships(targetId) += id
    relationship
  }
  
  def getRelationship(id: ID): Option[Relationship] = relationships.get(id)
  
  def getNodeRelationships(nodeId: ID): Set[Relationship] = {
    if (!nodes.contains(nodeId)) {
      throw new IllegalArgumentException(s"Node $nodeId does not exist")
    }
    
    nodeRelationships(nodeId).flatMap(relationships.get).toSet
  }
  
  def deleteRelationship(id: ID): Option[Relationship] = {
    relationships.get(id).map { rel =>
      nodeRelationships(rel.sourceId) -= id
      nodeRelationships(rel.targetId) -= id
      relationships.remove(id)
    }
  }
  
  // Utility methods
  private def generateId(prefix: String): ID = s"$prefix-${java.util.UUID.randomUUID().toString}"
  
  // Stats and info
  def nodeCount: Int = nodes.size
  def relationshipCount: Int = relationships.size
  
  override def toString: String = s"Graph(nodes: $nodeCount, relationships: $relationshipCount)"
}
