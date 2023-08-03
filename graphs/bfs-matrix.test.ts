import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { bfs } from "./bfs-matrix.ts";
import { WeightedAdjacencyMatrix } from "./types.ts";

Deno.test("Weigted adjacency matrix graph Breadth first search 1", () => {
  const graph: WeightedAdjacencyMatrix = [
    [0, 3, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1],
  ];

  assertEquals(bfs(graph, 0, 6), [0, 1, 4, 5, 6]);
  assertEquals(bfs(graph, 6, 0), null);
});

Deno.test("Weigted adjacency matrix graph Breadth first search 2", () => {
  const graph: WeightedAdjacencyMatrix = [
    [0, 1, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ];

  assertEquals(bfs(graph, 0, 2), [0, 3, 2]);
});
