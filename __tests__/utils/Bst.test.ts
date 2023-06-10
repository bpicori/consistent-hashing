import { BST } from "../../src/utils/Bst.js";

describe("BST", () => {
  let bst: BST<string>;

  beforeEach(() => {
    bst = new BST();
  });

  describe("insert", () => {
    it("should insert a node into an empty tree", () => {
      bst.insert("A1");
      expect(bst.getRootNode()?.data).toBe("A1");
    });

    it("should insert nodes in the correct order", () => {
      bst.insert("B2");
      bst.insert("A1");
      bst.insert("C3");
      expect(bst.getRootNode()?.data).toBe("B2");
      expect(bst.getRootNode()?.left?.data).toBe("A1");
      expect(bst.getRootNode()?.right?.data).toBe("C3");
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
      expect(bst.getRootNode()?.data).toBe("C3");
      expect(bst.getRootNode()?.left?.data).toBe("A1");
      expect(bst.getRootNode()?.right).toBeNull();
    });
  });
});
