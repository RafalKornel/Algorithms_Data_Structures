import { Node } from "./Node.ts";

export function traversePostOrder<T>(curr: Node<T> | undefined, values: T[]) {
  // base case
  if (!curr)
    return;

  // recurse left
  traversePostOrder(curr.left, values);

  // recurse right
  traversePostOrder(curr.right, values);

  // visiting node
  values.push(curr.value);
  //console.log(curr.value);
}
