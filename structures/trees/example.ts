import type { Node } from "./Node.ts";

export let root: Node<number> = { value: 7 };
root.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
root.right = { value: 3, left: { value: 18 }, right: { value: 21 } };