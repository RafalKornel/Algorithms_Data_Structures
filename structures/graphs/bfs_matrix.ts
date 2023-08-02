import { Queue } from "../linked/queue.ts";

type WeightedAdjacencyMatrix = number[][];

type Index = number;
type Value = number;

function bfs(graph: WeightedAdjacencyMatrix, source: Index, needle: Value): Index[] | null {
	let seen: boolean[] = new Array(graph.length).fill(false);
	let prev: Index[] = new Array(graph.length).fill(-1); // default for not-seen state

	let q = new Queue<number>();

	q.enqueue(source);
	seen[0] = true;

	do {
		let curr = q.deque();
		if (curr === undefined) break;
		
		if (curr === needle) break;

		let adjNodes = graph[curr];

		for (let i = 0; i < adjNodes.length; i++) {
			if (adjNodes[i] === 0) continue;
			
			if (seen[i]) continue;

			seen[i] = true;
			prev[i] = curr;

			q.enqueue(i);	
	
		}

	} while (q.length);


	let curr = needle;
	let path = [];

	while(prev[curr] !== -1) {
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

function test() {

	const graph: WeightedAdjacencyMatrix = [
	    [0, 3, 1,  0, 0, 0, 0], // 0
	    [0, 0, 0,  0, 1, 0, 0],
	    [0, 0, 7,  0, 0, 0, 0],
	    [0, 0, 0,  0, 0, 0, 0],
	    [0, 1, 0,  5, 0, 2, 0],
	    [0, 0, 18, 0, 0, 0, 1],
	    [0, 0, 0,  1, 0, 0, 1],
	];

	let graph2: WeightedAdjacencyMatrix = [
		[0, 1, 0, 1],
		[0, 0, 0, 1],
		[0, 0, 0, 1],
		[0, 0, 1, 0],
	]

	console.log(bfs(graph, 0, 6)); // should be [0, 1, 4, 5, 6];
	console.log(bfs(graph, 6, 0)); // should be null;

	console.log(bfs(graph2, 0, 2)); // should be [0, 3, 2]
}

test()
