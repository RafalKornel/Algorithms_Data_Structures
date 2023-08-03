import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { HashMap } from "./hash-map.ts";

Deno.test("Hash map - set and get", () => {
  const map = new HashMap<string, number>();

  map.set("foo", 10);
  assertEquals(map.get("foo"), 10);

  assertEquals(map.get("baz"), undefined);
});

Deno.test("Hash map - remove", () => {
  const map = new HashMap<string, number>();

  map.set("foo", 10);
  map.set("baz", 20);

  assertEquals(map.get("foo"), 10);
  assertEquals(map.get("baz"), 20);

  map.remove("baz");

  assertEquals(map.get("foo"), 10);
  assertEquals(map.get("baz"), undefined);

  map.remove("bar");

  assertEquals(map.get("foo"), 10);
  assertEquals(map.get("baz"), undefined);
});

Deno.test("Hash map - resize", () => {
  const map = new HashMap<string, number>();

  assertEquals(map.loadFactor, 0); // 0;

  map.set("a", 1);
  assertEquals(map.loadFactor, 0.1); // 0.1;

  map.set("b", 1);
  assertEquals(map.loadFactor, 0.2); // 0.2;

  map.set("c", 1);
  assertEquals(map.loadFactor, 0.3); // 0.3;

  map.set("d", 1);
  assertEquals(map.loadFactor, 0.4); // 0.4;

  map.set("e", 1);
  assertEquals(map.loadFactor, 0.5); // 0.5;

  map.set("f", 1);
  assertEquals(map.loadFactor, 0.6); // 0.6;

  map.set("g", 1);
  assertEquals(map.loadFactor, 0.7); // 0.7;

  map.set("h", 1);
  assertEquals(map.loadFactor, 0.4); // 0.4;

  map.set("i", 1);
  assertEquals(map.loadFactor, 0.45); // 0.45;

  map.set("j", 1);
  assertEquals(map.loadFactor, 0.5); // 0.5;

  map.remove("a");
  assertEquals(map.loadFactor, 0.45); // 0.45;

  map.remove("b");
  assertEquals(map.loadFactor, 0.4); // 0.4;

  map.remove("c");
  assertEquals(map.loadFactor, 0.35); // 0.35;

  map.remove("d");
  assertEquals(map.loadFactor, 0.3); // 0.3;

  map.remove("e");
  assertEquals(map.loadFactor, 0.25); // 0.25;

  map.remove("f");
  assertEquals(map.loadFactor, 0.4); // 0.2;

  map.remove("g");
  assertEquals(map.loadFactor, 0.3); // 0.4;

  map.remove("h");
  assertEquals(map.loadFactor, 0.4); // 0.2;

  map.remove("i");
  assertEquals(map.loadFactor, 0.2); // 0.2;
});
