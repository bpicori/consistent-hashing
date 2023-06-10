import { Cluster } from "./core/Cluster.js";

async function main(): Promise<void> {
  const cluster = new Cluster();
  cluster.registerServer("node1");
  cluster.registerServer("node2");
  cluster.registerServer("node3");
  cluster.registerServer("node4");

  for (let i = 0; i < 100; i++) {
    cluster.insertKey(`key${i}`);
  }

  cluster.removeKey("key0");
  cluster.removeKey("key1");
  cluster.removeKey("key7");

  cluster.removeServer("node2");

  cluster.status();
}

main();
