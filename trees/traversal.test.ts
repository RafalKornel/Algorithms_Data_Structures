import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Node } from "./types.ts";
import {
  traverseInOrder,
  traversePostOrder,
  traversePreOrder,
} from "./traversal.ts";

const root: Node<number> = { value: 7 };
root.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
root.right = { value: 3, left: { value: 18 }, right: { value: 21 } };

Deno.test("In order traversal", () => {
  const values: number[] = [];

  traverseInOrder(root, values);

  assertEquals(values, [5, 23, 4, 7, 18, 3, 21]);
});

Deno.test("In pre traversal", () => {
  const values: number[] = [];

  traversePreOrder(root, values);

  assertEquals(values, [7, 23, 5, 4, 3, 18, 21]);
});

Deno.test("In post traversal", () => {
  const values: number[] = [];

  traversePostOrder(root, values);

  assertEquals(values, [5, 4, 23, 18, 21, 3, 7]);
});
