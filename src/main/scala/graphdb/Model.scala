package graphdb

object Model {
  type ID = String

  type Properties = Map[String, Any]

  case class Node(id: ID, labels: Set[String] = Set.empty, properties: Properties = Map.empty)

  case class Relationship(id: ID, 
                          sourceId: ID, 
                          targetId: ID, 
                          relationType: String, 
                          properties: Properties = Map.empty)
}