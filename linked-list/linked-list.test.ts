import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { UniDirectionalList } from "./linked-list.ts";

// TODO: refactor test - split into multiple cases
Deno.test("Linked list", () => {
  const array = new UniDirectionalList<number>();

  assertEquals(array.length, 0);
  
  array.push(1);
  array.push(2);
  array.push(3);

  assertEquals(array.length, 3);

  assertEquals(array.toArray(), [1, 2, 3]);

  assertEquals(array.pop(), 3);

  assertEquals(array.toArray(), [1, 2]);

  array.push(4);
  array.remove(2);
  array.remove(1);

  assertEquals(array.toArray(), [4]);

  array.remove((v) => v === 4);
  assertEquals(array.toArray(), []);

  array.push(5);
  array.append(6);
  assertEquals(array.toArray(), [6, 5]);

  assertEquals(array.prepend(), 6);
  assertEquals(array.toArray(), [5]);

  assertEquals(array.length, 1);

  assertEquals(
    array.find((v) => v === 5),
    5
  );
});
