import { Graph, GraphNode } from "./types.ts";

export function dfs(
  graph: Graph,
  start: GraphNode,
  needle: GraphNode
): GraphNode[] | null {
  const seen: boolean[] = new Array(graph.length).fill(false);

  const path: GraphNode[] = []; // should be something with O(1) push/pop, ArrayList is fine

  function walk(curr: GraphNode): boolean {
    // base conditions

    if (seen[curr]) return false;

    path.push(curr);

    if (curr === needle) return true;

    // pre
    seen[curr] = true;

    // recurse
    const adj = graph[curr];
    for (let i = 0; i < adj.length; i++) {
      const edge = adj[i];

      if (walk(edge.to)) return true;
    }

    // post
    path.pop();

    return false;
  }

  walk(start);

  if (path.length === 0) return null;

  return path;
}
