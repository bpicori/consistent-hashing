import { BST } from "../../src/utils/Bst.js";

describe("BST", () => {
  let bst: BST<string>;

  beforeEach(() => {
    bst = new BST();
  });

  describe("insert", () => {
    it("should insert a node into an empty tree", () => {
      bst.insert("A1");
      expect(bst.getRootNode()?.value).toBe("A1");
    });

    it("should insert nodes in the correct order", () => {
      bst.insert("B2");
      bst.insert("A1");
      bst.insert("C3");
      expect(bst.getRootNode()?.value).toBe("B2");
      expect(bst.getRootNode()?.left?.value).toBe("A1");
      expect(bst.getRootNode()?.right?.value).toBe("C3");
    });
  });

  describe("remove", () => {
    beforeEach(() => {
      bst.insert("B2");
      bst.insert("A1");
      bst.insert("C3");
    });

    it("should remove a leaf node", () => {
      bst.remove("A1");
      expect(bst.getRootNode()?.left).toBeNull();
    });

    it("should remove a node with two children", () => {
      bst.remove("B2");
      expect(bst.getRootNode()?.value).toBe("C3");
      expect(bst.getRootNode()?.left?.value).toBe("A1");
      expect(bst.getRootNode()?.right).toBeNull();
    });
  });

  describe("getRootNode", () => {
    it("should return null for an empty tree", () => {
      expect(bst.getRootNode()).toBeNull();
    });

    it("should return the root node", () => {
      bst.insert("A1");
      expect(bst.getRootNode()?.value).toBe("A1");
    });
  });

  describe("findNode", () => {
    beforeEach(() => {
      bst.insert("B2");
      bst.insert("A1");
      bst.insert("C3");
    });

    it("should return null if the tree is empty", () => {
      bst = new BST();
      expect(bst.findNode("A1")).toBeNull();
    });

    it("should return null if the node is not found", () => {
      expect(bst.findNode("D4")).toBeNull();
    });

    it("should return the node if it is found", () => {
      expect(bst.findNode("A1")?.value).toBe("A1");
    });
  });
});
