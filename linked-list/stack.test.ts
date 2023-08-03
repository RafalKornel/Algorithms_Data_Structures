import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Stack } from "./stack.ts";

// TODO: refactor test - split into multiple cases
Deno.test("Stack", () => {
  const s = new Stack();

  assertEquals(s.size, 0);

  s.push(0);

  assertEquals(s.size, 1);
  assertEquals(s.list, [0]);

  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);

  assertEquals(s.size, 5);
  assertEquals(s.list, [4, 3, 2, 1, 0]);

  assertEquals(s.peek(), 4);

  assertEquals(s.pop(), 4);
  assertEquals(s.pop(), 3);
  assertEquals(s.pop(), 2);
  assertEquals(s.pop(), 1);
  assertEquals(s.pop(), 0);
  assertEquals(s.pop(), undefined);

  assertEquals(s.size, 0);

  assertEquals(s.peek(), undefined);
});
