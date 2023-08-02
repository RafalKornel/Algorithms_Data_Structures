import { Queue } from "../linked/queue.ts";
import { Graph, GraphNode, NULL_GRAPH_NODE } from "./Graph.ts";

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

function dijkstra(graph: Graph, from: GraphNode): { distances: Distances, prev: GraphNode[] } {
	let prev: GraphNode[] = new Array(graph.length).fill(NULL_GRAPH_NODE);
	let seen: boolean[] = new Array(graph.length).fill(false);

	let distances: Distances = new Array(graph.length).fill(Infinity);

	distances[from] = 0;

	// O(V) for while loop, but also O(V) for hasUnvisited, so O(V^2) in total
	while (hasUnvisited(seen, distances)) {
		// O(V), but V-times
		let curr: GraphNode = getSmallestUnseen(seen, distances);

		// something went horribly wrong
		if (curr === NULL_GRAPH_NODE) break;

		seen[curr] = true;

		const prevNode: GraphNode = prev[curr];

		const adj = graph[curr];
	
		// O(E)	
		for (let i = 0; i < adj.length; i++) {
			const edge = adj[i];

			// part of the greedy part of algorithm
			if(seen[edge.to]) continue;

			const distanceByCurr = distances[curr] + edge.weight;

			if (distances[edge.to] > distanceByCurr) {
				distances[edge.to] = distanceByCurr;
				prev[edge.to] = curr;
			}
		}
	}

	return { distances, prev };
}

function shortestPath(graph: Graph, from: GraphNode, needle: GraphNode): GraphNode[] {
	const { distances, prev } = dijkstra(graph, from);

	let path: GraphNode[] = [];

	let curr = needle;

	while(prev[curr] !== NULL_GRAPH_NODE) {
		path.push(curr);
		curr = prev[curr];
	}

	if (path.length) {
		path.push(from);
	}

	return path.reverse();
}

let g1: Graph = [
  [{ to: 3, weight: 7 }, { to: 1, weight: 1 }],
  [{ to: 3, weight: 2 }],
  [{ to: 3, weight: 1 }],
  [{ to: 2, weight: 2 }],
  [{ to: 1, weight: 1 }] 
]

console.log(dijkstra(g1, 0));
console.log(shortestPath(g1, 0, 2)); // [ 0, 1, 3, 2 ]
console.log(shortestPath(g1, 4, 0)); // [ ]
