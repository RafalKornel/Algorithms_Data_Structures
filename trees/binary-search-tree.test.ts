import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import type { Node } from "./types.ts";
import {
  find,
  findParent,
  getList,
  insert,
  remove,
  validate,
} from "./binary-search-tree.ts";

Deno.test("Binary search tree - validate", () => {
  const rootValid: Node<number> = { value: 10 };
  rootValid.left = { value: 6, left: { value: 4 }, right: { value: 7 } };
  rootValid.right = { value: 19, left: { value: 18 }, right: { value: 21 } };

  const rootInvalid1: Node<number> = { value: 7 };
  rootInvalid1.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
  rootInvalid1.right = { value: 3, left: { value: 18 }, right: { value: 21 } };

  const rootInvalid2 = { value: 18, left: { value: 17, right: { value: 19 } } };

  assertEquals(validate(rootInvalid1), false);
  assertEquals(validate(rootInvalid2), false);
  assertEquals(validate(rootValid), true);
});

Deno.test("Binary search tree - insert", () => {
  const root: Node<number> = { value: 10 };
  root.left = { value: 6, left: { value: 4 }, right: { value: 7 } };
  root.right = { value: 19, left: { value: 18 }, right: { value: 21 } };

  insert(root, 12);

  assertEquals(validate(root), true);

  assertEquals(getList(root), [4, 6, 7, 10, 12, 18, 19, 21]);
});

Deno.test("Binary search tree - remove", () => {
  const root: Node<number> = { value: 10 };
  root.left = { value: 6, left: { value: 4 }, right: { value: 7 } };
  root.right = { value: 19, left: { value: 18 }, right: { value: 21 } };

  remove(root, root.left!.left!);

  assertEquals(validate(root), true);

  assertEquals(getList(root), [6, 7, 10, 18, 19, 21]);
});

Deno.test("Binary search tree - find", () => {
  const root: Node<number> = { value: 10 };
  root.left = { value: 6, left: { value: 4 }, right: { value: 7 } };
  root.right = { value: 19, left: { value: 18 }, right: { value: 21 } };

  assertEquals(find(root, 6), true);
  assertEquals(find(root, 1), false);
});

Deno.test("Binary search tree - find parent", () => {
  const root: Node<number> = { value: 10 };
  root.left = { value: 6, left: { value: 4 }, right: { value: 7 } };
  root.right = { value: 19, left: { value: 18 }, right: { value: 21 } };

  assertEquals(findParent(root, root.left), root);
  assertEquals(findParent(root, root.left.left!), root.left);
});
