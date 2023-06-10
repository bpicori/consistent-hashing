export class Node<T> {
  public left: Node<T> | null = null;
  public right: Node<T> | null = null;
  public data: T;
}

export class BST<T> {
  private root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  public insert(data: T): void {
    const newNode: Node<T> = new Node();
    newNode.data = data;

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  public remove(data: T): void {
    this.root = this.removeNode(this.root, data);
  }

  public getRootNode(): Node<T> | null {
    return this.root;
  }

  private insertNode(node: Node<T>, newNode: Node<T>): void {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.data > node.data) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  private removeNode(node: Node<T> | null, data: T): Node<T> | null {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
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

      const aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
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
