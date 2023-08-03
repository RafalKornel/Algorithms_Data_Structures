import { Graph, GraphNode, NULL_GRAPH_NODE } from "./types.ts";

type Distances = number[];

function hasUnvisited(seen: boolean[], distances: Distances) {
  return seen.some((value, i) => !value && distances[i] < Infinity);
}

function getSmallestUnseen(seen: boolean[], distances: Distances) {
  let index = NULL_GRAPH_NODE;
  let smallestDist = Infinity;

  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) continue;

    if (distances[i] < smallestDist) {
      index = i;
      smallestDist = distances[i];
    }
  }

  return index;
}

export function dijkstra(
  graph: Graph,
  from: GraphNode
): { distances: Distances; prev: GraphNode[] } {
  const prev: GraphNode[] = new Array(graph.length).fill(NULL_GRAPH_NODE);
  const seen: boolean[] = new Array(graph.length).fill(false);

  const distances: Distances = new Array(graph.length).fill(Infinity);

  distances[from] = 0;

  // O(V) for while loop, but also O(V) for hasUnvisited, so O(V^2) in total
  while (hasUnvisited(seen, distances)) {
    // O(V), but V-times
    const curr: GraphNode = getSmallestUnseen(seen, distances);

    // something went horribly wrong
    if (curr === NULL_GRAPH_NODE) break;

    seen[curr] = true;

    const adj = graph[curr];

    // O(E)
    for (let i = 0; i < adj.length; i++) {
      const edge = adj[i];

      // part of the greedy part of algorithm
      if (seen[edge.to]) continue;

      const distanceByCurr = distances[curr] + edge.weight;

      if (distances[edge.to] > distanceByCurr) {
        distances[edge.to] = distanceByCurr;
        prev[edge.to] = curr;
      }
    }
  }

  return { distances, prev };
}

export function shortestPath(
  graph: Graph,
  from: GraphNode,
  needle: GraphNode
): GraphNode[] {
  const { prev } = dijkstra(graph, from);

  const path: GraphNode[] = [];

  let curr = needle;

  while (prev[curr] !== NULL_GRAPH_NODE) {
    path.push(curr);
    curr = prev[curr];
  }

  if (path.length) {
    path.push(from);
  }

  return path.reverse();
}
