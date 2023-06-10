export class Node<T, M = unknown> {
  public left: Node<T, M> | null = null;
  public right: Node<T, M> | null = null;
  public value: T;
  public metadata?: M;
}

export class BST<T, M = unknown> {
  private root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  public insert(value: T, metadata?: M): void {
    const newNode: Node<T> = new Node();
    newNode.value = value;
    newNode.metadata = metadata;

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  public remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  public getRootNode(): Node<T> | null {
    return this.root;
  }

  public findNode(value: T): Node<T> | null {
    return this.findNodeRecursive(this.root, value);
  }

  private insertNode(node: Node<T>, newNode: Node<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  private removeNode(node: Node<T> | null, value: T): Node<T> | null {
    if (node === null) {
      return null;
    } else if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // found node to be deleted

      // Case 1: Node is a leaf node (no children)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // Case 2: Node has only right child
      if (node.left === null) {
        node = node.right;
        return node;
      }

      // Case 3: Node has only left child
      if (node.right === null) {
        node = node.left;
        return node;
      }

      const minNode = this.findMinNode(node.right);
      node.value = minNode.value;

      node.right = this.removeNode(node.right, minNode.value);
      return node;
    }
  }

  private findNodeRecursive<T>(
    root: Node<T, unknown> | null,
    value: T
  ): Node<T, unknown> | null {
    if (root === null) {
      return null;
    } else if (value < root.value) {
      return this.findNodeRecursive(root.left, value);
    } else if (value > root.value) {
      return this.findNodeRecursive(root.right, value);
    } else {
      return root;
    }
  }

  private findMinNode(right: Node<T>): Node<T> {
    if (right.left === null) {
      return right;
    } else {
      return this.findMinNode(right.left);
    }
  }
}
