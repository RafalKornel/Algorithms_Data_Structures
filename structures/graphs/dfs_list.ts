import { Graph, GraphNode, NULL_GRAPH_NODE } from "./Graph.ts";

function dfs(graph: Graph, start: GraphNode, needle: GraphNode): GraphNode[] {
	let prev: GraphNode[] = new Array(graph.length).fill(NULL_GRAPH_NODE);
	let seen: boolean[] = new Array(graph.length).fill(false);

	let path: GraphNode[] = []; // should be something with O(1) push/pop, ArrayList is fine

	function walk(curr: GraphNode): boolean {
		// base conditions

		if (seen[curr]) return false;

		path.push(curr);

		if (curr === needle) return true;

		// pre
		seen[curr] = true;

		// recurse
		let adj = graph[curr];
		for (let i = 0; i < adj.length; i++) {
			const edge = adj[i];

			if (walk(edge.to)) return true;
		}

		// post
		path.pop();

		return false;
	}


	walk(start);

	return path;

}


let g1: Graph = [
  [{ to: 1, weight: 1 }, { to: 3, weight: 1 }],
  [{ to: 3, weight: 1 }],
  [{ to: 3, weight: 1 }],
  [{ to: 2, weight: 1 }] 
]

console.log(dfs(g1, 0, 2)); // [0, 1, 3, 2] or [0, 3, 2] depending on order of edges in adjacency lists

let g2: Graph = [
	[{ to: 1, weight: 1 }, { to: 2, weight: 1 }],
	[{ to: 4, weight: 1 }],
	[{ to: 4, weight: 1 }],
	[{ to: 3, weight: 1 }],
	[{ to: 1, weight: 1 }, { to: 3, weight: 1 }, { to: 5, weight: 1}],
	[{ to: 2, weight: 1 }, { to: 6, weight: 1}],
	[{ to: 6, weight: 1 }]
]

console.log(dfs(g2, 0, 6)); // should be [0, 1, 4, 5, 6];
console.log(dfs(g2, 6, 0)); // should be []
