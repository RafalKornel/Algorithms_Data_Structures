import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Heap } from "./Heap.ts";

Deno.test("MaxHeap.add", () => {
  const heap = new Heap("max");

  heap.add(3);
  assertEquals(heap.printList(), [3].toString());

  heap.add(40);
  assertEquals(heap.printList(), [40, 3].toString());

  heap.add(61);
  assertEquals(heap.printList(), [61, 3, 40].toString());

  heap.add(69);
  assertEquals(heap.printList(), [69, 61, 40, 3].toString());

  heap.add(70);
  assertEquals(heap.printList(), [70, 69, 40, 3, 61].toString());

  heap.add(71);
  assertEquals(heap.printList(), [71, 69, 70, 3, 61, 40].toString());
});

Deno.test("MaxHeap.remove", () => {
  const heap = new Heap("max");

  heap.add(3);
  heap.add(40);
  heap.add(61);
  heap.add(69);
  heap.add(70);
  heap.add(71);

  assertEquals(heap.remove(), 71);
  assertEquals(heap.printList(), [70, 69, 40, 3, 61].toString());

  assertEquals(heap.remove(), 70);
  assertEquals(heap.printList(), [69, 61, 40, 3].toString());

  assertEquals(heap.remove(), 69);
  assertEquals(heap.printList(), [61, 3, 40].toString());

  assertEquals(heap.remove(), 61);
  assertEquals(heap.printList(), [40, 3].toString());

  assertEquals(heap.remove(), 40);
  assertEquals(heap.printList(), [3].toString());

  assertEquals(heap.remove(), 3);
  assertEquals(heap.printList(), [].toString());
});

Deno.test("MaxHeap.length", () => {
  const heap = new Heap("max");
  assertEquals(heap.length, 0);

  heap.add(3);
  assertEquals(heap.length, 1);

  heap.add(40);
  assertEquals(heap.length, 2);

  heap.add(61);
  assertEquals(heap.length, 3);

  heap.add(69);
  assertEquals(heap.length, 4);

  heap.add(70);
  assertEquals(heap.length, 5);

  heap.add(71);
  assertEquals(heap.length, 6);
});

Deno.test("MaxHeap.validate", () => {
  const heap = new Heap("max");

  heap.add(3);
  heap.add(40);
  heap.add(61);
  heap.add(69);
  heap.add(70);
  heap.add(71);

  assertEquals(heap.validate(), true);

  heap.add(10);
  assertEquals(heap.validate(), true);

  heap.remove();
  assertEquals(heap.validate(), true);
});

Deno.test("MaxHeap.peek", () => {
  const heap = new Heap("max");

  heap.add(3);
  assertEquals(heap.peek(), 3);

  heap.add(40);
  assertEquals(heap.peek(), 40);

  heap.add(61);
  assertEquals(heap.peek(), 61);

  heap.add(70);
  assertEquals(heap.peek(), 70);

  heap.add(69);
  assertEquals(heap.peek(), 70);

  heap.add(71);
  assertEquals(heap.peek(), 71);

  heap.remove();
  assertEquals(heap.peek(), 70);

  heap.remove();
  assertEquals(heap.peek(), 69);

  heap.remove();
  assertEquals(heap.peek(), 61);

  heap.remove();
  assertEquals(heap.peek(), 40);

  heap.remove();
  assertEquals(heap.peek(), 3);
});
