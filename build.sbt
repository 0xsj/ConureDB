name := "ScalaGraphDB"
version := "0.1.0"
scalaVersion := "2.13.16"  

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.2.17" % Test,
  "com.typesafe.scala-logging" %% "scala-logging" % "3.9.5",
  "ch.qos.logback" % "logback-classic" % "1.4.11"
)

assembly / assemblyJarName := s"${name.value}-${version.value}.jar"
assembly / mainClass := Some("graphdb.Main")

scalacOptions ++= Seq(
  "-deprecation",
  "-feature",
  "-Xlint",
  "-Ywarn-dead-code",
  "-Ywarn-unused"
)
