import { Cluster } from "../src/core/Cluster.js";

describe("Cluster", () => {
  let cluster: Cluster;

  beforeEach(() => {
    cluster = new Cluster();
  });

  it("should register servers correctly", () => {
    cluster.registerServer("server1");
    const status = cluster.status();
    expect(status.servers).toContain("server1");
  });

  it("should throw error if server already exists", () => {
    cluster.registerServer("server1");
    expect(() => cluster.registerServer("server1")).toThrow(
      `Server server1 already exists`
    );
  });

  it("should remove servers correctly", () => {
    cluster.registerServer("server1");
    cluster.removeServer("server1");
    const status = cluster.status();
    expect(status.servers).not.toContain("server1");
  });

  it("should throw error if server to remove does not exist", () => {
    expect(() => cluster.removeServer("server1")).toThrow(
      `Server server1 not found`
    );
  });

  it("should insert keys correctly", () => {
    cluster.registerServer("server1");
    cluster.insertKey("key1");
    const status = cluster.status();
    expect(status.data["server1"]).toHaveLength(1);
    expect(status.data["server1"][0].value).toEqual("key1");
  });

  it("should remove keys correctly", () => {
    cluster.registerServer("server1");
    cluster.insertKey("key1");
    cluster.removeKey("key1");
    const status = cluster.status();
    expect(status.data["server1"]).toHaveLength(0);
  });

  it("should handle keys after removing a server", () => {
    cluster.registerServer("server1");
    cluster.registerServer("server2");
    cluster.insertKey("key1"); // Assuming it falls into 'server1'
    cluster.removeServer("server1");
    const status = cluster.status();
    expect(status.servers).not.toContain("server1");
    expect(status.data["server2"]).toHaveLength(1);
    expect(status.data["server2"][0].value).toEqual("key1");
  });

  it("should return status correctly", () => {
    cluster.registerServer("server1");
    cluster.insertKey("key1");
    const status = cluster.status();
    expect(status.servers).toEqual(["server1"]);
    expect(status.data).toEqual({
      server1: [{ value: "key1", modulo: expect.any(Number) }],
    });
  });
});
