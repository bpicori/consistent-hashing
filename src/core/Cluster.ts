import { BST } from "../utils/Bst.js";
import { Hash } from "../utils/Hash.js";

const MAX_NODES = 360;

type ServerName = string;
type Key = {
  value: string;
  modulo: number;
};

type ServerMetadata = {
  name: ServerName;
  modulo: number;
};

type ClusterData = Record<ServerName, Key[]>;

type ClusterStatus = {
  servers: ServerName[];
  data: ClusterData;
};

export class Cluster {
  private nodesState: BST<number, ServerMetadata>;
  private data: ClusterData;
  private servers: ServerName[];

  constructor() {
    this.nodesState = new BST();
    this.data = {};
    this.servers = [];
  }

  public registerServer(serverName: ServerName): void {
    const modulo = this.getModulo(serverName);

    if (this.servers.includes(serverName)) {
      throw new Error(`Server ${serverName} already exists`);
    }

    this.nodesState.insert(modulo, { name: serverName, modulo });
    this.data[serverName] = [];
    this.servers.push(serverName);
  }

  public removeServer(serverName: ServerName): void {
    const modulo = this.getModulo(serverName);

    const server = this.nodesState.findNode(modulo);
    if (!server) {
      throw new Error(`Server ${serverName} not found`);
    }

    const serverData = [...this.data[serverName]];
    this.nodesState.remove(modulo);
    delete this.data[serverName];
    this.servers = this.servers.filter((s) => s !== serverName);

    for (const key of serverData) {
      this.insertKey(key.value);
    }
  }

  public insertKey(key: string): void {
    const modulo = this.getModulo(key);
    const server = this.findServerName(modulo);
    this.data[server].push({
      value: key,
      modulo: modulo,
    });
  }

  public removeKey(key: string): void {
    const modulo = this.getModulo(key);
    const server = this.findServerName(modulo);
    this.data[server] = this.data[server].filter((k) => k.value !== key);
  }

  public status(): ClusterStatus {
    return {
      servers: this.servers,
      data: this.data,
    };
  }

  private findServerName(keyHash: number): ServerName {
    const successorServer = this.nodesState.findSuccessor(keyHash);
    if (successorServer === null) {
      const minNode = this.nodesState.findMinimumNode();
      if (minNode === null) {
        throw new Error("No servers in the cluster");
      }
      return minNode.metadata.name;
    }

    return successorServer.metadata.name;
  }

  private getModulo(key: string): number {
    const hash = Hash.hash(key);
    return hash.toNumber() % MAX_NODES;
  }
}
