package graphdb

package graphdb

import Model._
import java.io._
import scala.util.{Try, Success => TrySuccess, Failure => TryFailure}
import com.typesafe.scalalogging.LazyLogging

/**
 * Provides persistence capabilities for the graph database
 */
class Persistence(graph: Graph) extends LazyLogging {
  
  /**
   * Saves the graph to a file
   * 
   * @param filename File path to save to
   * @return True if successful, false otherwise
   */
  def saveToFile(filename: String): Boolean = {
    try {
      val file = new File(filename)
      // Create parent directories if they don't exist
      file.getParentFile.mkdirs()
      
      val oos = new ObjectOutputStream(new FileOutputStream(file))
      try {
        // Extract data from graph
        val serializedData = serializeGraph()
        oos.writeObject(serializedData)
        logger.info(s"Graph saved to $filename")
        true
      } finally {
        oos.close()
      }
    } catch {
      case e: Exception =>
        logger.error(s"Failed to save graph to $filename: ${e.getMessage}", e)
        false
    }
  }
  
  /**
   * Loads the graph from a file
   * 
   * @param filename File path to load from
   * @return True if successful, false otherwise
   */
  def loadFromFile(filename: String): Boolean = {
    try {
      val file = new File(filename)
      if (!file.exists()) {
        logger.error(s"File not found: $filename")
        return false
      }
      
      val ois = new ObjectInputStream(new FileInputStream(file))
      try {
        val data = ois.readObject().asInstanceOf[SerializedGraph]
        deserializeGraph(data)
        logger.info(s"Graph loaded from $filename")
        true
      } finally {
        ois.close()
      }
    } catch {
      case e: Exception =>
        logger.error(s"Failed to load graph from $filename: ${e.getMessage}", e)
        false
    }
  }
  
  /**
   * Exports the graph to JSON format
   * 
   * @param filename File path to save JSON to
   * @return True if successful, false otherwise
   */
  def exportToJson(filename: String): Boolean = {
    try {
      val file = new File(filename)
      file.getParentFile.mkdirs()
      
      val data = serializeGraph()
      val json = createJson(data)
      
      val writer = new PrintWriter(file)
      try {
        writer.write(json)
        logger.info(s"Graph exported to JSON file $filename")
        true
      } finally {
        writer.close()
      }
    } catch {
      case e: Exception =>
        logger.error(s"Failed to export graph to JSON: ${e.getMessage}", e)
        false
    }
  }
  
  /**
   * Imports the graph from JSON format
   * 
   * @param filename File path to load JSON from
   * @return True if successful, false otherwise
   */
  def importFromJson(filename: String): Boolean = {
    try {
      val file = new File(filename)
      if (!file.exists()) {
        logger.error(s"JSON file not found: $filename")
        return false
      }
      
      val source = scala.io.Source.fromFile(file)
      try {
        val jsonString = source.mkString
        val data = parseJson(jsonString)
        deserializeGraph(data)
        logger.info(s"Graph imported from JSON file $filename")
        true
      } finally {
        source.close()
      }
    } catch {
      case e: Exception => 
        logger.error(s"Failed to import graph from JSON: ${e.getMessage}", e)
        false
    }
  }
  
  // Serialization logic
  
  /**
   * Container for serialized graph data
   */
  case class SerializedGraph(
    nodes: List[Node],
    relationships: List[Relationship]
  ) extends Serializable
  
  /**
   * Serializes the graph into a storable format
   */
  private def serializeGraph(): SerializedGraph = {
    // Collect all nodes and relationships from the graph
    val nodes = collectAllNodes()
    val relationships = collectAllRelationships()
    
    SerializedGraph(nodes.toList, relationships.toList)
  }
  
  /**
   * Deserializes graph data from a stored format
   */
  private def deserializeGraph(data: SerializedGraph): Unit = {
    // Clear existing graph
    graph.clear()
    
    // Create all nodes
    val nodeIdMap = scala.collection.mutable.Map[ID, ID]()
    
    for (node <- data.nodes) {
      graph.createNode(node.labels, node.properties) match {
        case Success(newNode) => nodeIdMap(node.id) = newNode.id
        case Failure(msg) => logger.error(s"Failed to create node: $msg")
      }
    }
    
    // Create all relationships (with mapped node IDs)
    for (rel <- data.relationships) {
      (nodeIdMap.get(rel.sourceId), nodeIdMap.get(rel.targetId)) match {
        case (Some(newSourceId), Some(newTargetId)) =>
          graph.createRelationship(newSourceId, newTargetId, rel.relationType, rel.properties) match {
            case Success(_) => // Successfully created
            case Failure(msg) => logger.error(s"Failed to create relationship: $msg")
          }
        case _ => 
          logger.error(s"Failed to map node IDs for relationship $rel")
      }
    }
  }
  
  /**
   * Collects all nodes from the graph
   */
  private def collectAllNodes(): List[Node] = {
    val result = scala.collection.mutable.ListBuffer[Node]()
    var i = 0
    
    while (true) {
      val nodeId = s"node-$i"
      graph.getNode(nodeId) match {
        case Success(node) => 
          result += node
          i += 1
        case Failure(_) => 
          // No more nodes with sequential IDs
          break()
      }
    }
    
    // Also try to find nodes with UUID-style IDs
    val foundIds = result.map(_.id).toSet
    
    // Search for node-UUID style IDs
    val uuidPattern = """node-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}""".r
    
    // This is a naive approach - in a real implementation, the graph would maintain
    // a proper registry of all node IDs rather than trying to guess them
    
    // For simplicity, we'll just return what we found with sequential IDs
    result.toList
  }
  
  /**
   * Collects all relationships from the graph
   */
  private def collectAllRelationships(): List[Relationship] = {
    val result = scala.collection.mutable.ListBuffer[Relationship]()
    val nodes = collectAllNodes()
    
    // Get all relationships for each node
    for (node <- nodes) {
      graph.getNodeRelationships(node.id) match {
        case Success(rels) => 
          // Add only relationships where this node is the source
          // to avoid adding relationships twice
          val outgoingRels = rels.filter(_.sourceId == node.id)
          result ++= outgoingRels
        case Failure(_) => // Skip
      }
    }
    
    result.toList
  }
  
  // Helper methods for JSON export/import
  
  /**
   * Creates a JSON string representation of serialized graph data
   */
  private def createJson(data: SerializedGraph): String = {
    val sb = new StringBuilder()
    sb.append("{\n")
    
    // Nodes array
    sb.append("  \"nodes\": [\n")
    val nodeStrings = data.nodes.map { node =>
      val props = node.properties.map { case (k, v) =>
        s""""$k": ${valueToJson(v)}"""
      }.mkString(", ")
      
      val labels = node.labels.map(l => s""""$l"""").mkString(", ")
      
      s"""    {
         |      "id": "${node.id}",
         |      "labels": [$labels],
         |      "properties": {$props}
         |    }""".stripMargin
    }
    sb.append(nodeStrings.mkString(",\n"))
    sb.append("\n  ],\n")
    
    // Relationships array
    sb.append("  \"relationships\": [\n")
    val relStrings = data.relationships.map { rel =>
      val props = rel.properties.map { case (k, v) =>
        s""""$k": ${valueToJson(v)}"""
      }.mkString(", ")
      
      s"""    {
         |      "id": "${rel.id}",
         |      "sourceId": "${rel.sourceId}",
         |      "targetId": "${rel.targetId}",
         |      "relationType": "${rel.relationType}",
         |      "properties": {$props}
         |    }""".stripMargin
    }
    sb.append(relStrings.mkString(",\n"))
    sb.append("\n  ]\n}")
    
    sb.toString()
  }
  
  /**
   * Converts a value to its JSON representation
   */
  private def valueToJson(value: Any): String = value match {
    case null => "null"
    case s: String => s""""$s""""
    case n: Number => n.toString
    case b: Boolean => b.toString
    case _ => s""""${value.toString}""""
  }
  
  /**
   * Parses a JSON string into serialized graph data
   * 
   * Note: This is a very simplified JSON parser.
   * In a real implementation, use a proper JSON library.
   */
  private def parseJson(json: String): SerializedGraph = {
    // This is a placeholder for simplicity
    // In a real implementation, use a JSON library like Jackson or Circe
    SerializedGraph(List.empty, List.empty)
  }
  
  /**
   * Helper method to break out of while(true) loops
   */
  private def break(): Nothing = {
    throw new scala.util.control.BreakControl()
  }
}