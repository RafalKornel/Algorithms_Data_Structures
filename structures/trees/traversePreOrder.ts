import { Node } from "./Node.ts";

export function traversePreOrder<T>(curr: Node<T> | undefined, values: T[]) {
  // base case
  if (!curr)
    return;

  // visiting node
  values.push(curr.value);
  //console.log(curr.value);

  // recurse left
  traversePreOrder(curr.left, values);

  // recurse right
  traversePreOrder(curr.right, values);
}
