import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Heap } from "./Heap.ts";

Deno.test("MinHeap.add case 1", () => {
  const heap = new Heap("min");

  heap.add(3);
  assertEquals(heap.printList(), [3].toString());

  heap.add(40);
  assertEquals(heap.printList(), [3, 40].toString());

  heap.add(61);
  assertEquals(heap.printList(), [3, 40, 61].toString());

  heap.add(69);
  assertEquals(heap.printList(), [3, 40, 61, 69].toString());

  heap.add(70);
  assertEquals(heap.printList(), [3, 40, 61, 69, 70].toString());

  heap.add(71);
  assertEquals(heap.printList(), [3, 40, 61, 69, 70, 71].toString());
});

Deno.test("MinHeap.add case 2", () => {
  const heap = new Heap("min");

  heap.add(50);
  assertEquals(heap.printList(), [50].toString());

  heap.add(40);
  assertEquals(heap.printList(), [40, 50].toString());

  heap.add(61);
  assertEquals(heap.printList(), [40, 50, 61].toString());

  heap.add(3);
  assertEquals(heap.printList(), [3, 40, 61, 50].toString());

  heap.add(12);
  assertEquals(heap.printList(), [3, 12, 61, 50, 40].toString());

  heap.add(2);
  assertEquals(heap.printList(), [2, 12, 3, 50, 40, 61].toString());
});

Deno.test("MinHeap.remove", () => {
  const heap = new Heap("min");

  heap.add(3);
  heap.add(40);
  heap.add(61);
  heap.add(69);
  heap.add(70);
  heap.add(71);

  assertEquals(heap.remove(), 3);
  assertEquals(heap.printList(), [40, 69, 61, 71, 70].toString());

  assertEquals(heap.remove(), 40);
  assertEquals(heap.printList(), [61, 69, 70, 71].toString());

  assertEquals(heap.remove(), 61);
  assertEquals(heap.printList(), [69, 71, 70].toString());

  assertEquals(heap.remove(), 69);
  assertEquals(heap.printList(), [70, 71].toString());

  assertEquals(heap.remove(), 70);
  assertEquals(heap.printList(), [71].toString());

  assertEquals(heap.remove(), 71);
  assertEquals(heap.printList(), [].toString());
});

Deno.test("MinHeap.length", () => {
  const heap = new Heap("min");
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

Deno.test("MinHeap.validate", () => {
  const heap = new Heap("min");

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

Deno.test("MinHeap.peek", () => {
  const heap = new Heap("min");

  heap.add(40);
  assertEquals(heap.peek(), 40);

  heap.add(20);
  assertEquals(heap.peek(), 20);

  heap.add(21);
  assertEquals(heap.peek(), 20);

  heap.add(70);
  assertEquals(heap.peek(), 20);

  heap.add(3);
  assertEquals(heap.peek(), 3);

  heap.add(2);
  assertEquals(heap.peek(), 2);

  heap.remove();
  assertEquals(heap.peek(), 3);

  heap.remove();
  assertEquals(heap.peek(), 20);

  heap.remove();
  assertEquals(heap.peek(), 21);

  heap.remove();
  assertEquals(heap.peek(), 40);

  heap.remove();
  assertEquals(heap.peek(), 70);
});
