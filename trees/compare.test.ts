import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import type { Node } from "./types.ts";
import { compare } from "./compare.ts";

Deno.test("Compare trees ", () => {
  const rootA: Node<number> = { value: 7 };
  rootA.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
  rootA.right = { value: 3, left: { value: 18 }, right: { value: 21 } };

  const rootB: Node<number> = { value: 7 };
  rootB.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
  rootB.right = { value: 3, left: { value: 18 }, right: { value: 21 } };

  const rootC: Node<number> = { value: 7 };
  rootC.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
  rootC.right = { value: 3, right: { value: 18, left: { value: 21 } } };

  // A == B
  // A != C
  // B != C

  assertEquals(compare(rootA, rootB), true);
  assertEquals(compare(rootA, rootC), false);
  assertEquals(compare(rootB, rootC), false);
});
