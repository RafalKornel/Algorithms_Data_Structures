import type { Node } from "./types.ts";

export function traverseInOrder<T>(curr: Node<T> | undefined, values: T[]) {
  // base case
  if (!curr || !curr.value) return;

  // recurse left
  traverseInOrder(curr.left, values);

  // visiting node
  values.push(curr.value);

  // recurse right
  traverseInOrder(curr.right, values);
}

export function traversePostOrder<T>(curr: Node<T> | undefined, values: T[]) {
  // base case
  if (!curr || !curr.value) return;

  // recurse left
  traversePostOrder(curr.left, values);

  // recurse right
  traversePostOrder(curr.right, values);

  // visiting node
  values.push(curr.value);
}

export function traversePreOrder<T>(curr: Node<T> | undefined, values: T[]) {
  // base case
  if (!curr || !curr.value) return;

  // visiting node
  values.push(curr.value);

  // recurse left
  traversePreOrder(curr.left, values);

  // recurse right
  traversePreOrder(curr.right, values);
}
