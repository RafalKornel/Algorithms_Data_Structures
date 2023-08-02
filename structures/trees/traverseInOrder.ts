import { Node } from "./Node.ts";

export function traverseInOrder<T>(curr: Node<T> | undefined, arr: T[]) {
  // base case
  if (!curr || !curr.value)
    return;

  // recurse left
  traverseInOrder(curr.left, arr);

  // visiting node
  arr.push(curr.value);

  //console.log(curr.value);

  // recurse right
  traverseInOrder(curr.right, arr);
}
