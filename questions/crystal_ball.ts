/** Question: We have two crystal balls and we are in a building with N floors.
 * There exist a floor, from which if we drop a ball it will drop.
 * Determine exactly at which floor will the crystall ball break;
 */

const FLOOR = 15;
const TOP_FLOOR = 101;

let balls = 2;

const doesBreak = (floor: number) => {
	if (floor >= FLOOR) { 
		balls--;
		if (balls < 0) throw new Error("Broke all balls!");
		return true;
 	} else {
		return false;
	}
}

function crystal_ball() {
	// is this valid jump? or should it be floor + 1?
	const jump = Math.floor(Math.sqrt(FLOOR));

	let i = 0;

	while (i + jump < TOP_FLOOR) {
		if (doesBreak(i + jump)) break;
		
		i += jump;
	}

	for (let j = 0; j <= jump; j++) { 
		if (doesBreak(i + j)) return i + j;
	}

	return -1;
}

console.log(crystal_ball());
