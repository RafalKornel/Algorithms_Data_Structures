import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Queue } from "./queue.ts";

// TODO: refactor test - split into multiple cases
Deno.test("Queue", () => {
  const q = new Queue<number>();

  assertEquals(q.size, 0);

  assertEquals(q.list, []);

  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);

  assertEquals(q.size, 3);
  assertEquals(q.list, [1, 2, 3]);

  assertEquals(q.deque(), 1);
  assertEquals(q.list, [2, 3]);

  assertEquals(q.peek(), 2);
  assertEquals(q.deque(), 2);
  assertEquals(q.list, [3]);

  assertEquals(q.size, 1);

  assertEquals(q.deque(), 3);
  assertEquals(q.list, []);

  assertEquals(q.deque(), undefined);
  assertEquals(q.list, []);
});
