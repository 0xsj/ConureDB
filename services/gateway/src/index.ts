import express, { Request, Response } from "express";
const app = express();

app.use(express.static("public"));
app.get("/hello", (req: Request, res: Response) => res.send("hello world"));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
