import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Trie } from "./trie.ts";

Deno.test("Trie - insert", () => {
  const trie = new Trie();

  assertEquals(trie.contains("abcde"), false);

  trie.insert("cat");
  assertEquals(trie.contains("abc"), false);
  assertEquals(trie.contains("cat"), true);

  trie.insert("dogg");
  assertEquals(trie.contains("abc"), false);
  assertEquals(trie.contains("cat"), true);
  assertEquals(trie.contains("dogg"), true);
  assertEquals(trie.contains("dog"), false);
  assertEquals(trie.contains("d"), false);
  assertEquals(trie.contains("c"), false);
  assertEquals(trie.contains(""), false);
});

Deno.test("Trie - remove", () => {
  const trie = new Trie();

  trie.insert("cat");
  trie.insert("cats");

  assertEquals(trie.contains("cat"), true);
  assertEquals(trie.contains("cats"), true);

  trie.remove("cats");

  assertEquals(trie.contains("cat"), true);
  assertEquals(trie.contains("cats"), false);

  trie.insert("cats");
  assertEquals(trie.contains("cat"), true);
  assertEquals(trie.contains("cats"), true);

  trie.insert("dog");
  trie.insert("dogs");

  assertEquals(trie.contains("dog"), true);
  assertEquals(trie.contains("dogs"), true);

  trie.remove("dog");

  assertEquals(trie.contains("dog"), false);
  assertEquals(trie.contains("dogs"), true);

  trie.insert("abc");
  trie.insert("abcd");

  trie.remove("abcd");
  trie.remove("abcd");

  assertEquals(trie.contains("abc"), true);
  assertEquals(trie.contains("abcd"), false);
});

Deno.test("Trie - autocomplete", () => {
  const trie = new Trie();

  trie.insert("cat");
  trie.insert("cats");
  trie.insert("catty");

  trie.insert("comb");

  trie.insert("dog");

  assertEquals(trie.autocomplete("c"), ["at", "ats", "atty", "omb"]);
  assertEquals(trie.autocomplete("d"), ["og"]);
});

Deno.test("Trie - words count", () => {
  const trie = new Trie();

  assertEquals(trie.wordsCount, 0);

  trie.insert("cat");
  trie.insert("cats");
  trie.insert("catty");

  assertEquals(trie.wordsCount, 3);

  trie.remove("cat");

  assertEquals(trie.wordsCount, 2);
});
