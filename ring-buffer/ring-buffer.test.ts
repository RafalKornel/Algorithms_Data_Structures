import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.196.0/assert/assert_throws.ts";
import { IntRingBuffer } from "./ring-buffer.ts";

Deno.test("Ring buffer - push, pop, print", () => {
  const rb = new IntRingBuffer(5);

  rb.push(0);
  assertEquals(rb.list, [0]);

  rb.push(1);
  assertEquals(rb.list, [0, 1]);

  assertEquals(rb.pop(), 0);
  assertEquals(rb.list, [1]);

  rb.push(2);
  assertEquals(rb.list, [1, 2]);

  assertEquals(rb.pop(), 1);
  assertEquals(rb.list, [2]);

  assertEquals(rb.pop(), 2);
  assertEquals(rb.list, []);

  assertEquals(rb.pop(), undefined);
  assertEquals(rb.list, []);
});

Deno.test("Ring buffer - capacity", () => {
  const rb = new IntRingBuffer(5);

  assertEquals(rb.capacity, 5);

  rb.push(0);
  rb.push(1);
  rb.push(2);
  rb.push(3);
  rb.push(4);

  assertEquals(rb.list, [0, 1, 2, 3, 4]);

  assertThrows(() => rb.push(6), "Buffer overflow");
});

Deno.test("Ring buffer - length", () => {
  const rb = new IntRingBuffer(5);

  assertEquals(rb.length, 0);

  rb.push(0);
  assertEquals(rb.length, 1);

  rb.push(1);
  assertEquals(rb.length, 2);

  rb.push(2);
  assertEquals(rb.length, 3);

  rb.push(3);
  assertEquals(rb.length, 4);

  rb.push(4);
  assertEquals(rb.length, 5);

  rb.pop();
  assertEquals(rb.length, 4);

  rb.pop();
  assertEquals(rb.length, 3);

  rb.pop();
  assertEquals(rb.length, 2);

  rb.pop();
  assertEquals(rb.length, 1);

  rb.pop();
  assertEquals(rb.length, 0);
});
