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

  describe("successor", () => {
    let bst: BST<number>;
    beforeEach(() => {
      bst = new BST();
      bst.insert(1);
      bst.insert(3);
      bst.insert(2);
      bst.insert(5);
    });

    it("should return null if the tree is empty", () => {
      bst = new BST();
      expect(bst.findSuccessor(1)).toBeNull();
    });

    it("should return the next highest node, if not found", () => {
      // expect(bst.findSuccessor(2)?.value).toBe(3);
      // expect(bst.findSuccessor(4)?.value).toBe(5);
      expect(bst.findSuccessor(0)?.value).toBe(1);
    });

    it("should return null if the node is the highest", () => {
      expect(bst.findSuccessor(6)).toBeNull();
    });
  });

  describe("findMinimumNode", () => {
    let bst: BST<number>;
    beforeEach(() => {
      bst = new BST();
      bst.insert(5);
      bst.insert(2);
      bst.insert(3);
    });

    it("should return the minimum node", () => {
      expect(bst.findMinimumNode().value).toEqual(2);
    });

    it("should throw an error if the tree is empty", () => {
      bst = new BST();
      expect(() => bst.findMinimumNode()).toThrow("Tree is empty");
    });

    it("should return the minimum node if the tree has only one node", () => {
      bst = new BST();
      bst.insert(1);
      expect(bst.findMinimumNode().value).toEqual(1);
    });
  });
});
