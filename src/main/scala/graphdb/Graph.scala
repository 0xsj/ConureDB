package graphdb

import Model._
import scala.collection.mutable
import com.typesafe.scalalogging.LazyLogging

/** Main graph database implementation that manages nodes and relationships
  */
class Graph extends LazyLogging {
  // Core data structures
  private val nodes         = mutable.Map[ID, Node]()
  private val relationships = mutable.Map[ID, Relationship]()

  // Index structures for faster lookups
  private val nodeLabelsIndex =
    mutable.Map[Label, mutable.Set[ID]]().withDefaultValue(mutable.Set.empty[ID])
  private val outgoingRelationships = mutable
    .Map[ID, mutable.Map[String, mutable.Set[ID]]]()
    .withDefaultValue(mutable.Map.empty.withDefaultValue(mutable.Set.empty))
  private val incomingRelationships = mutable
    .Map[ID, mutable.Map[String, mutable.Set[ID]]]()
    .withDefaultValue(mutable.Map.empty.withDefaultValue(mutable.Set.empty))

  // Node operations

  /** Creates a new node with the specified labels and properties
    *
    * @param labels
    *   Set of labels to assign to the node
    * @param properties
    *   Map of properties to assign to the node
    * @return
    *   The newly created node
    */
  def createNode(
      labels: Set[String] = Set.empty,
      properties: Properties = Map.empty
  ): GraphResult[Node] = {
    val id   = generateId("node")
    val node = Node(id, labels, properties)

    nodes(id) = node

    // Update indexes
    labels.foreach { label =>
      val labelNodes = nodeLabelsIndex.getOrElseUpdate(label, mutable.Set.empty[ID])
      labelNodes += id
    }

    outgoingRelationships(id) = mutable.Map.empty.withDefaultValue(mutable.Set.empty)
    incomingRelationships(id) = mutable.Map.empty.withDefaultValue(mutable.Set.empty)

    logger.debug(s"Created node: $node")
    GraphResult.success(node)
  }

  /** Retrieves a node by its ID
    *
    * @param id
    *   The node ID
    * @return
    *   An Option containing the node if found
    */
  def getNode(id: ID): GraphResult[Node] = {
    nodes.get(id) match {
      case Some(node) => GraphResult.success(node)
      case None       => GraphResult.failure(s"Node with id $id not found")
    }
  }

  /** Updates an existing node with new labels and properties
    *
    * @param id
    *   The node ID
    * @param labels
    *   New set of labels (completely replaces existing ones)
    * @param properties
    *   New map of properties (completely replaces existing ones)
    * @return
    *   GraphResult containing the updated node or a failure
    */
  def updateNode(id: ID, labels: Set[String], properties: Properties): GraphResult[Node] = {
    nodes.get(id) match {
      case Some(existingNode) =>
        // Update indexes (remove old label references)
        existingNode.labels.foreach { label =>
          nodeLabelsIndex.get(label).foreach(_ -= id)
        }

        // Create updated node
        val updatedNode = Node(id, labels, properties)
        nodes(id) = updatedNode

        // Add new label references
        labels.foreach { label =>
          val labelNodes = nodeLabelsIndex.getOrElseUpdate(label, mutable.Set.empty[ID])
          labelNodes += id
        }

        logger.debug(s"Updated node: $updatedNode")
        GraphResult.success(updatedNode)

      case None =>
        GraphResult.failure(s"Cannot update node: Node with id $id not found")
    }
  }

  /** Deletes a node by ID
    *
    * @param id
    *   The node ID
    * @return
    *   GraphResult containing the deleted node or a failure
    */
  def deleteNode(id: ID): GraphResult[Node] = {
    nodes.get(id) match {
      case Some(node) =>
        // Check if node has relationships
        val hasOutgoing = outgoingRelationships.get(id).exists(_.exists(_._2.nonEmpty))
        val hasIncoming = incomingRelationships.get(id).exists(_.exists(_._2.nonEmpty))

        if (hasOutgoing || hasIncoming) {
          return GraphResult.failure(s"Cannot delete node $id as it has existing relationships")
        }

        // Remove from indexes
        node.labels.foreach { label =>
          nodeLabelsIndex.get(label).foreach(_ -= id)
        }

        // Remove node
        nodes.remove(id)
        outgoingRelationships.remove(id)
        incomingRelationships.remove(id)

        logger.debug(s"Deleted node: $node")
        GraphResult.success(node)

      case None =>
        GraphResult.failure(s"Cannot delete node: Node with id $id not found")
    }
  }

  /** Finds nodes with a specific label
    *
    * @param label
    *   The label to search for
    * @return
    *   Set of nodes with the given label
    */
  def findNodesByLabel(label: String): Set[Node] = {
    nodeLabelsIndex.getOrElse(label, Set.empty).flatMap(nodes.get).toSet
  }

  /** Finds nodes with specific property values
    *
    * @param propertyKey
    *   The property key to match
    * @param propertyValue
    *   The property value to match
    * @return
    *   Set of nodes with matching property values
    */
  def findNodesByProperty(propertyKey: String, propertyValue: Any): Set[Node] = {
    nodes.values.filter(_.properties.get(propertyKey).contains(propertyValue)).toSet
  }

  // Relationship operations

  /** Creates a new relationship between two nodes
    *
    * @param sourceId
    *   ID of the source node
    * @param targetId
    *   ID of the target node
    * @param relationType
    *   Type of relationship
    * @param properties
    *   Map of properties for the relationship
    * @return
    *   The newly created relationship
    */
  def createRelationship(
      sourceId: ID,
      targetId: ID,
      relationType: String,
      properties: Properties = Map.empty
  ): GraphResult[Relationship] = {
    if (!nodes.contains(sourceId)) {
      return GraphResult.failure(s"Source node $sourceId does not exist")
    }

    if (!nodes.contains(targetId)) {
      return GraphResult.failure(s"Target node $targetId does not exist")
    }

    val id           = generateId("rel")
    val relationship = Relationship(id, sourceId, targetId, relationType, properties)

    relationships(id) = relationship

    // Update indexes
    val sourceOutgoing = outgoingRelationships.getOrElseUpdate(
      sourceId,
      mutable.Map.empty.withDefaultValue(mutable.Set.empty)
    )
    val relTypeSet = sourceOutgoing.getOrElseUpdate(relationType, mutable.Set.empty[ID])
    relTypeSet += id

    val targetIncoming = incomingRelationships.getOrElseUpdate(
      targetId,
      mutable.Map.empty.withDefaultValue(mutable.Set.empty)
    )
    val targetRelTypeSet = targetIncoming.getOrElseUpdate(relationType, mutable.Set.empty[ID])
    targetRelTypeSet += id

    logger.debug(s"Created relationship: $relationship")
    GraphResult.success(relationship)
  }

  /** Retrieves a relationship by its ID
    *
    * @param id
    *   The relationship ID
    * @return
    *   GraphResult containing the relationship or a failure
    */
  def getRelationship(id: ID): GraphResult[Relationship] = {
    relationships.get(id) match {
      case Some(relationship) => GraphResult.success(relationship)
      case None               => GraphResult.failure(s"Relationship with id $id not found")
    }
  }

  /** Updates an existing relationship with new properties
    *
    * @param id
    *   The relationship ID
    * @param properties
    *   New properties (completely replaces existing ones)
    * @return
    *   GraphResult containing the updated relationship or a failure
    */
  def updateRelationship(id: ID, properties: Properties): GraphResult[Relationship] = {
    relationships.get(id) match {
      case Some(existing) =>
        val updated =
          Relationship(id, existing.sourceId, existing.targetId, existing.relationType, properties)
        relationships(id) = updated
        logger.debug(s"Updated relationship: $updated")
        GraphResult.success(updated)

      case None =>
        GraphResult.failure(s"Cannot update relationship: Relationship with id $id not found")
    }
  }

  /** Deletes a relationship by ID
    *
    * @param id
    *   The relationship ID
    * @return
    *   GraphResult containing the deleted relationship or a failure
    */
  def deleteRelationship(id: ID): GraphResult[Relationship] = {
    relationships.get(id) match {
      case Some(rel) =>
        // Remove from indexes
        outgoingRelationships.get(rel.sourceId).foreach { relTypes =>
          relTypes.get(rel.relationType).foreach(_ -= id)
        }

        incomingRelationships.get(rel.targetId).foreach { relTypes =>
          relTypes.get(rel.relationType).foreach(_ -= id)
        }

        // Remove relationship
        val removed = relationships.remove(id).get
        logger.debug(s"Deleted relationship: $removed")
        GraphResult.success(removed)

      case None =>
        GraphResult.failure(s"Cannot delete relationship: Relationship with id $id not found")
    }
  }

  /** Gets all relationships (incoming and outgoing) for a node
    *
    * @param nodeId
    *   The node ID
    * @return
    *   Set of relationships connected to the node
    */
  def getNodeRelationships(nodeId: ID): GraphResult[Set[Relationship]] = {
    if (!nodes.contains(nodeId)) {
      return GraphResult.failure(s"Node $nodeId does not exist")
    }

    val outRels = outgoingRelationships.getOrElse(nodeId, Map.empty).values.flatten
    val inRels  = incomingRelationships.getOrElse(nodeId, Map.empty).values.flatten

    val allRels = (outRels ++ inRels).flatMap(relationships.get).toSet
    GraphResult.success(allRels)
  }

  /** Gets outgoing relationships for a node, optionally filtered by relationship type
    *
    * @param nodeId
    *   The node ID
    * @param relType
    *   Optional relationship type filter
    * @return
    *   Set of outgoing relationships from the node
    */
  def getOutgoingRelationships(
      nodeId: ID,
      relType: Option[String] = None
  ): GraphResult[Set[Relationship]] = {
    if (!nodes.contains(nodeId)) {
      return GraphResult.failure(s"Node $nodeId does not exist")
    }

    // Convert mutable.Map → immutable.Map and mutable.Set → immutable.Set
    val nodeOutgoingRels: Map[String, Set[ID]] =
      outgoingRelationships
        .getOrElse(nodeId, Map.empty)
        .map { case (k, v) => (k, v.toSet) } // Convert mutable.Set → immutable.Set
        .toMap // Ensure immutable.Map

    val relIds: Set[ID] = relType match {
      case Some(t) =>
        nodeOutgoingRels.getOrElse(t, Set.empty[ID])
      case None =>
        nodeOutgoingRels.values.flatten.toSet
    }

    GraphResult.success(relIds.flatMap(relationships.get).toSet)
  }

  /** Gets incoming relationships for a node, optionally filtered by relationship type
    *
    * @param nodeId
    *   The node ID
    * @param relType
    *   Optional relationship type filter
    * @return
    *   Set of incoming relationships to the node
    */
  def getIncomingRelationships(
      nodeId: ID,
      relType: Option[String] = None
  ): GraphResult[Set[Relationship]] = {
    if (!nodes.contains(nodeId)) {
      return GraphResult.failure(s"Node $nodeId does not exist")
    }

    // Convert mutable.Map → immutable.Map and mutable.Set → immutable.Set
    val nodeIncomingRels: Map[String, Set[ID]] =
      incomingRelationships
        .getOrElse(nodeId, Map.empty)
        .map { case (k, v) => (k, v.toSet) } // Convert mutable.Set → immutable.Set
        .toMap // Ensure immutable.Map

    val relIds: Set[ID] = relType match {
      case Some(t) =>
        nodeIncomingRels.getOrElse(t, Set.empty[ID])
      case None =>
        nodeIncomingRels.values.flatten.toSet
    }

    GraphResult.success(relIds.flatMap(relationships.get).toSet)
  }

  /** Finds paths between nodes using breadth-first search
    *
    * @param startNodeId
    *   Starting node ID
    * @param endNodeId
    *   Ending node ID
    * @param maxDepth
    *   Maximum path length to consider
    * @return
    *   Set of paths (each a list of alternating nodes and relationships)
    */
  def findPaths(
      startNodeId: ID,
      endNodeId: ID,
      maxDepth: Int = 10
  ): GraphResult[List[List[Any]]] = {
    if (!nodes.contains(startNodeId)) {
      return GraphResult.failure(s"Start node $startNodeId does not exist")
    }

    if (!nodes.contains(endNodeId)) {
      return GraphResult.failure(s"End node $endNodeId does not exist")
    }

    val paths   = mutable.ListBuffer[List[Any]]()
    val visited = mutable.Set[ID]()

    def bfs(current: ID, path: List[Any], depth: Int): Unit = {
      if (depth > maxDepth) return

      if (current == endNodeId) {
        paths += (path :+ nodes(current))
        return
      }

      if (visited.contains(current)) return
      visited += current

      // Get outgoing relationships
      val outRels = outgoingRelationships.getOrElse(current, Map.empty).values.flatten
      for {
        relId <- outRels
        rel   <- relationships.get(relId)
        targetId = rel.targetId
        if !visited.contains(targetId)
      } {
        bfs(targetId, path :+ nodes(current) :+ rel, depth + 1)
      }

      visited -= current
    }

    bfs(startNodeId, List.empty, 0)
    GraphResult.success(paths.toList)
  }

  // Utility methods

  /** Generates a unique ID with a prefix
    *
    * @param prefix
    *   String prefix for the ID
    * @return
    *   A unique ID string
    */
  private def generateId(prefix: String): ID = s"$prefix-${java.util.UUID.randomUUID().toString}"

  /** Clears all data from the graph
    */
  def clear(): Unit = {
    nodes.clear()
    relationships.clear()
    nodeLabelsIndex.clear()
    outgoingRelationships.clear()
    incomingRelationships.clear()
    logger.info("Graph cleared")
  }

  /** Provides access to all nodes in the graph
    */
  def getNodes: Set[Node] = nodes.values.toSet

  /** Provides access to all relationships in the graph
    */
  def getRelationships: Set[Relationship] = relationships.values.toSet

  // Graph statistics

  /** Count of nodes in the graph
    */
  def nodeCount: Int = nodes.size

  /** Count of relationships in the graph
    */
  def relationshipCount: Int = relationships.size

  /** Count of nodes with a specific label
    *
    * @param label
    *   The label to count
    * @return
    *   Number of nodes with the given label
    */
  def nodeLabelCount(label: String): Int = nodeLabelsIndex.getOrElse(label, Set.empty).size

  /** Count of relationships of a specific type
    *
    * @param relationType
    *   The relationship type to count
    * @return
    *   Number of relationships with the given type
    */
  def relationshipTypeCount(relationType: String): Int = {
    relationships.values.count(_.relationType == relationType)
  }

  override def toString: String = s"Graph(nodes: $nodeCount, relationships: $relationshipCount)"
}
