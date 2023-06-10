import { Server } from "./api/server.js";
import { Cluster } from "./core/Cluster.js";

async function main(): Promise<void> {
  const server = new Server();
  const cluster = new Cluster();
  await server.start(cluster);
}

main();
