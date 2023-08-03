import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import type { Node } from "./types.ts";
import { breadthFirstTraverse } from "./breadth-first-traverse.ts";

const root: Node<number> = { value: 7 };
root.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
root.right = { value: 3, left: { value: 18 }, right: { value: 21 } };

Deno.test("Breadth first traverse", () => {
  const arr: number[] = [];

  breadthFirstTraverse(root, arr);

  assertEquals(arr, [7, 23, 3, 5, 4, 18, 21]);
});
