export class Node<T, M> {
  public left: Node<T, M> | null = null;
  public right: Node<T, M> | null = null;

  constructor(public value: T, public metadata: M) {}
}

export class BST<T, M = unknown> {
  private root: Node<T, M> | null;

  constructor() {
    this.root = null;
  }

  public insert(value: T, metadata?: M): void {
    const newNode: Node<T, M> = new Node(value, metadata || ({} as M));

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  public remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  public getRootNode(): Node<T, M> | null {
    return this.root;
  }

  public findNode(value: T): Node<T, M> | null {
    return this.findNodeRecursive(this.root, value);
  }

  public findSuccessor(value: T): Node<T, M> | null {
    let currentNode = this.root;
    let successor: Node<T, M> | null = null;

    while (currentNode !== null) {
      if (value < currentNode.value) {
        successor = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        if (currentNode.right !== null) {
          const minNode = this.findMinNode(currentNode.right);
          return minNode;
        }
        break;
      }
    }

    return successor;
  }

  public findMinimumNode(): Node<T, M> {
    if (this.root === null) {
      throw new Error("Tree is empty");
    }
    return this.findMinNode(this.root);
  }

  private insertNode(node: Node<T, M>, newNode: Node<T, M>): void {
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

  private removeNode(node: Node<T, M> | null, value: T): Node<T, M> | null {
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

  private findNodeRecursive<T, M>(
    root: Node<T, M> | null,
    value: T
  ): Node<T, M> | null {
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

  private findMinNode(right: Node<T, M>): Node<T, M> {
    if (right.left === null) {
      return right;
    } else {
      return this.findMinNode(right.left);
    }
  }
}
