import { ClusterStatus } from "../../../src/core/Cluster";

export class ClusterClient {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async status(): Promise<ClusterStatus> {
    const response = await fetch(`${this.baseUrl}/`);
    return await response.json();
  }

  async registerServer(serverName: string): Promise<ClusterStatus> {
    const response = await fetch(`${this.baseUrl}/server`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: serverName }),
    });
    return await response.json();
  }

  async removeServer(serverName: string): Promise<ClusterStatus> {
    const response = await fetch(`${this.baseUrl}/server`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: serverName }),
    });
    return await response.json();
  }

  async insertKey(key: string): Promise<ClusterStatus> {
    const response = await fetch(`${this.baseUrl}/key`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: key }),
    });
    return await response.json();
  }

  async removeKey(key: string): Promise<ClusterStatus> {
    const response = await fetch(`${this.baseUrl}/key`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: key }),
    });
    return await response.json();
  }
}
