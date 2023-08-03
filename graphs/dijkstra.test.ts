import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Graph } from "./types.ts";
import { dijkstra, shortestPath } from "./dijkstra.ts";

Deno.test("Dijkstra shortest path", () => {
  const graph: Graph = [
    [
      { to: 3, weight: 7 },
      { to: 1, weight: 1 },
    ],
    [{ to: 3, weight: 2 }],
    [{ to: 3, weight: 1 }],
    [{ to: 2, weight: 2 }],
    [{ to: 1, weight: 1 }],
  ];

  assertEquals(shortestPath(graph, 0, 2), [0, 1, 3, 2]);
  assertEquals(shortestPath(graph, 4, 0), []);
});

Deno.test("Dijkstra distance", () => {
  const graph: Graph = [
    [
      { to: 3, weight: 7 },
      { to: 1, weight: 1 },
    ],
    [{ to: 3, weight: 2 }],
    [{ to: 3, weight: 1 }],
    [{ to: 2, weight: 2 }],
    [{ to: 1, weight: 1 }],
  ];

  assertEquals(dijkstra(graph, 0).distances, [0, 1, 5, 3, Infinity]);
  assertEquals(dijkstra(graph, 1).distances, [Infinity, 0, 4, 2, Infinity]);
  assertEquals(dijkstra(graph, 2).distances, [Infinity, Infinity, 0, 1, Infinity]);
  assertEquals(dijkstra(graph, 3).distances, [Infinity, Infinity, 2, 0, Infinity]);
  assertEquals(dijkstra(graph, 4).distances, [Infinity, 1, 5, 3, 0]);
});
