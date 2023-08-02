enum Tile {
	Wall = "#",
	Exit = "E",
	Start = "S",
	Path = " ",
	Seen = "X",
};

function findPath(maze: string[]) {
	let path: [number, number][] = [];

	let start: [number, number] = [0, 0];

	for (let i = 0; i < maze.length; i++) {
		for (let j = 0; j < maze[i].length; j++) {
			if (maze[i][j] === Tile.Start) {
				start = [i, j];

				break;
			}
		}
	}

	//console.log(start);


	const recursion = (i: number, j: number): boolean => {
		if (i < 0 || i >= maze.length || j < 0 || j >= maze[i].length) return false;
		
		const current = maze[i][j];

		if (current === Tile.Wall) return false;

		if (current === Tile.Exit) {
			path.push([i, j]);
			return true;
		}


		if (current === Tile.Seen) return false;


		maze[i] = maze[i].slice(0, j) + Tile.Seen + maze[i].slice(j + 1);		

		

		const left = recursion(i, j - 1);
		if (left) {
			path.push([i, j]);
			return true;
		}


		const right = recursion(i, j + 1);
		if (right) {
			path.push([i, j]);
			return true;
		}


		const top = recursion(i - 1, j);
		if (top) {
			path.push([i, j]);
			return true;
		}

		const bottom = recursion(i + 1, j);
		if (bottom) {
			path.push([i, j]);
			return true;
		}

		return false;

	}

	recursion(...start);

	return path;
}

console.log(findPath(
[
"#####E#",
"#     #",
"#S#####"
]));

console.log(findPath(
[
"#####E#",
"#  #  #",
"# ## ##",
"#     #",
"#S#####"
]));
