import express, { Request } from "express";
import cors from "cors";
import { Cluster } from "../core/Cluster.js";

export class Server {
  constructor(private port = 3000) {}

  public async start(cluster: Cluster): Promise<void> {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/", (_req: Request, res) => {
      res.json(cluster.status());
    });

    app.post("/server", (req: Request, res) => {
      const { name } = req.body;
      cluster.registerServer(name);
      res.json(cluster.status());
    });

    app.delete("/server", (req: Request, res) => {
      const { name } = req.body;
      cluster.removeServer(name);
      res.json(cluster.status());
    });

    app.post("/key", (req: Request, res) => {
      const { value } = req.body;
      cluster.insertKey(value);
      res.json(cluster.status());
    });

    app.delete("/key", (req: Request, res) => {
      const { value } = req.body;
      cluster.removeKey(value);
      res.json(cluster.status());
    });

    app.post("/reset", (_req: Request, res) => {
      cluster = new Cluster();
      res.json(cluster.status());
    });

    app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
