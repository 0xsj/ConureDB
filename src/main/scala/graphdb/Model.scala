package graphdb

object Model {
  // Unique identifier for nodes and relationships
  type ID = String

  // Properties for nodes and relationships
  type Properties = Map[String, Any]

  // A node in the graph
  case class Node(id: ID, labels: Set[String] = Set.empty, properties: Properties = Map.empty)

  // A relationship (edge) in the graph
  case class Relationship(
    id: ID, 
    sourceId: ID, 
    targetId: ID, 
    relationType: String, 
    properties: Properties = Map.empty
  )
}
