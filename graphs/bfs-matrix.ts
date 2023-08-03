import { Queue } from "../linked/queue.ts";
import { WeightedAdjacencyMatrix, Index, Value } from "./types.ts";

export function bfs(
  graph: WeightedAdjacencyMatrix,
  source: Index,
  needle: Value
): Index[] | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const prev: Index[] = new Array(graph.length).fill(-1); // default for not-seen state

  const q = new Queue<number>();

  q.enqueue(source);
  seen[0] = true;

  do {
    const curr = q.deque();
    if (curr === undefined) break;

    if (curr === needle) break;

    const adjNodes = graph[curr];

    for (let i = 0; i < adjNodes.length; i++) {
      if (adjNodes[i] === 0) continue;

      if (seen[i]) continue;

      seen[i] = true;
      prev[i] = curr;

      q.enqueue(i);
    }
  } while (q.size);

  let curr = needle;
  let path = [];

  while (prev[curr] !== -1) {
    path.push(prev[curr]);
    curr = prev[curr];
  }

  if (path.length) {
    path = path.reverse();
    path.push(needle);
    return path;
  }

  return null;
}
