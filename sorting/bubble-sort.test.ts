import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { bubble_sort } from "./bubble-sort.ts";

Deno.test("Bubble sort", () => {
  const a = [5, 1, 3, 6, 3, 5];

  bubble_sort(a);

  assertEquals(a, [1, 3, 3, 5, 5, 6]);

  const b: number[] = [];

  bubble_sort(b);

  assertEquals(b, []);
});
