package graphdb

object Model {
  type ID         = String
  type Properties = Map[String, Any]
  type Label      = String

  /** Represents a node in the graph database
    *
    * @param id
    *   Unique identifier for the node
    * @param labels
    *   Set of labels that categorize the node
    * @param properties
    *   Map of properties associated with the node
    */
  final case class Node(
      id: ID,
      labels: Set[Label],
      properties: Properties
  ) {
    override def toString: String =
      s"Node($id, labels=[${labels
          .mkString(", ")}], properties=${properties.map { case (k, v) => s"$k:$v" }.mkString("{", ", ", "}")})"
  }

  /** Represents a relationship (edge) between two nodes in the graph
    *
    * @param id
    *   Unique identifier for the relationship
    * @param sourceId
    *   ID of the source node
    * @param targetId
    *   ID of the target node
    * @param relationType
    *   Type of relationship (e.g. "KNOWS", "BELONGS_TO")
    * @param properties
    *   Map of properties associated with the relationship
    */
  final case class Relationship(
      id: ID,
      sourceId: ID,
      targetId: ID,
      relationType: String,
      properties: Properties
  ) {
    override def toString: String =
      s"Relationship($id, $sourceId -[$relationType]-> $targetId, properties=${properties
          .map { case (k, v) => s"$k:$v" }
          .mkString("{", ", ", "}")})"
  }

  /** Represents the result of a graph operation
    */
  sealed trait GraphResult[+T]
  case class Success[T](value: T)     extends GraphResult[T]
  case class Failure(message: String) extends GraphResult[Nothing]

  /** Factory for creating common graph results
    */
  object GraphResult {
    def success[T](value: T): GraphResult[T]           = Success(value)
    def failure(message: String): GraphResult[Nothing] = Failure(message)
  }
}
