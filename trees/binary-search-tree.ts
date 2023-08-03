import type { Node } from "./types.ts";
import { traverseInOrder } from "./traversal.ts";

// O(n)
export function validate<T>(root: Node<T> | undefined): boolean {
  if (!root) return true;

  if (!root.value) return false;

  const values = getList(root);

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] > values[i + 1]) return false;
  }

  return true;
}

// O(log(n)) ~ O(n) or O(h)
export function find<T>(root: Node<T> | undefined, needle: T): boolean {
  // base condition
  if (!root || !root.value) return false;

  if (root.value === needle) return true;

  // recurse
  if (needle < root.value) return find(root.left, needle);

  if (needle > root.value) return find(root.right, needle);

  return false;
}

// O(log(n)) ~ O(n) or O(h)
export function insert<T>(root: Node<T> | undefined, value: T): boolean {
  if (!root || !root.value) return false;

  // left branch
  if (root.value >= value) {
    if (root.left) return insert(root.left, value);

    root.left = { value } as Node<T>;
    return true;
  }

  // right branch
  if (root.value < value) {
    if (root.right) return insert(root.right, value);

    root.right = { value } as Node<T>;
    return true;
  }

  return false;
}

// O(log(n)) ~ O(n) or O(h)
export function findParent<T>(
  node: Node<T> | undefined,
  element: Node<T>
): Node<T> | undefined {
  if (!node) return undefined;

  if (node.left === element || node.right === element) {
    return node;
  }

  return findParent(node.left, element) || findParent(node.right, element);
}

// O(log(n)) ~ O(n) or O(h)
export function remove<T>(root: Node<T>, element: Node<T>): boolean {
  // node to remove has no child at all
  if (!element.left && !element.right) {
    const parent = findParent(root, element);

    if (!parent) return false;

    const isLeftChild = parent.left === element;

    if (isLeftChild) {
      parent.left = undefined;
    } else {
      parent.right = undefined;
    }

    return true;
  }
  // node to remove has both children
  else if (element.left && element.right) {
    let smallestElement = element.right;

    while (smallestElement.left && smallestElement.right) {
      smallestElement = smallestElement.left;
    }

    // now smallestElement should be the smallest node in the right subtree
    element.value = smallestElement.value;
    return remove(element, smallestElement);
  }
  // node to remove has only one child
  else {
    const parent = findParent(root, element);
    if (!parent) return false;

    const isLeftChild = parent.left === element;

    const child = element.left || element.right;

    if (isLeftChild) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  return false;
}

export function getList<T>(root: Node<T>): T[] {
  const values: T[] = [];

  traverseInOrder(root, values);

  return values;
}
