import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { quick_sort } from "./quick-sort.ts";

Deno.test("Quick sort", () => {
  const a = [5, 2, 7, 2, 5, 3, 1, 7, 4];

  quick_sort(a);

  assertEquals(a, [1, 2, 2, 3, 4, 5, 5, 7, 7]);

  const b: number[] = [];

  quick_sort(b);

  assertEquals(b, []);
});
