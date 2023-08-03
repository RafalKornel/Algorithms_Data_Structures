import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";
import { Graph } from "./types.ts";
import { dfs } from "./dfs-list.ts";

Deno.test("Adjacency list graph Depth first search 1", () => {
  const graph: Graph = [
    [
      { to: 1, weight: 1 },
      { to: 3, weight: 1 },
    ],
    [{ to: 3, weight: 1 }],
    [{ to: 3, weight: 1 }],
    [{ to: 2, weight: 1 }],
  ];

  assertEquals(dfs(graph, 0, 2), [0, 1, 3, 2]);
});

Deno.test("Adjacency list graph Depth first search 2", () => {
  const graph: Graph = [
    [
      { to: 1, weight: 1 },
      { to: 2, weight: 1 },
    ],
    [{ to: 4, weight: 1 }],
    [{ to: 4, weight: 1 }],
    [{ to: 3, weight: 1 }],
    [
      { to: 1, weight: 1 },
      { to: 3, weight: 1 },
      { to: 5, weight: 1 },
    ],
    [
      { to: 2, weight: 1 },
      { to: 6, weight: 1 },
    ],
    [{ to: 6, weight: 1 }],
  ];

  assertEquals(dfs(graph, 0, 6), [0, 1, 4, 5, 6]);
  assertEquals(dfs(graph, 6, 0), null);
});
