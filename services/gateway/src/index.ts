import "reflect-metadata";
import express, { Request, Response } from "express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import * as playground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server";
import { appModule } from "./modules/app.module";
const PORT = 3000;
const GRAPHQL_PATH = "/graphql";
const PLAYGROUND_PATH = "/playground";

const app = express();

app.use(express.static("public"));

app.get(
  `${PLAYGROUND_PATH}`,
  playground.default({
    endpoint: `${GRAPHQL_PATH}`,
    // tabs:
  })
);

app.use("/voyager", voyagerMiddleware({ endpointUrl: `${GRAPHQL_PATH}` }));
const server = new ApolloServer({
  // modules: [appModule],
});

app.get("/hello", (req: Request, res: Response) => res.send("hello world"));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
