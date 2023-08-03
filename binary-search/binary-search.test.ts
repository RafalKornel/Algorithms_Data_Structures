import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import {
  binarySearchIterative,
  binarySearchRecursive,
} from "./binary-search.ts";

Deno.test("Binary search recursive", () => {
  assertEquals(Infinity, binarySearchRecursive([1, 2, 3, 4, 5, 6], 0));
  assertEquals(0, binarySearchRecursive([1, 2, 3, 4, 5, 6], 1));
  assertEquals(1, binarySearchRecursive([1, 2, 3, 4, 5, 6], 2));
  assertEquals(2, binarySearchRecursive([1, 2, 3, 4, 5, 6], 3));
  assertEquals(3, binarySearchRecursive([1, 2, 3, 4, 5, 6], 4));
  assertEquals(4, binarySearchRecursive([1, 2, 3, 4, 5, 6], 5));
  assertEquals(5, binarySearchRecursive([1, 2, 3, 4, 5, 6], 6));
  assertEquals(Infinity, binarySearchRecursive([1, 2, 3, 4, 5, 6], 7));
  assertEquals(Infinity, binarySearchRecursive([1, 2, 3, 4, 5], 7));
  assertEquals(2, binarySearchRecursive([1, 2, 3, 4, 5], 3));
});

Deno.test("Binary search iterarive", () => {
  assertEquals(Infinity, binarySearchIterative([1, 2, 3, 4, 5, 6], 0));
  assertEquals(0, binarySearchIterative([1, 2, 3, 4, 5, 6], 1));
  assertEquals(1, binarySearchIterative([1, 2, 3, 4, 5, 6], 2));
  assertEquals(2, binarySearchIterative([1, 2, 3, 4, 5, 6], 3));
  assertEquals(3, binarySearchIterative([1, 2, 3, 4, 5, 6], 4));
  assertEquals(4, binarySearchIterative([1, 2, 3, 4, 5, 6], 5));
  assertEquals(5, binarySearchIterative([1, 2, 3, 4, 5, 6], 6));
  assertEquals(Infinity, binarySearchIterative([1, 2, 3, 4, 5, 6], 7));
  assertEquals(Infinity, binarySearchIterative([1, 2, 3, 4, 5], 7));
  assertEquals(2, binarySearchIterative([1, 2, 3, 4, 5], 3));
});
