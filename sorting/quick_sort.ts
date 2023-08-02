function quick_sort(arr: number[], lo: number, hi: number) {
	// invalid input
	if (arr.length === 0 || lo < 0 || hi >= arr.length) return;


	// base condition
	if (hi <= lo) return;
	
	let pivot = hi;
	let p1 = lo;

	for (let p2 = lo; p2 < pivot; p2++) {
		if (arr[p2] <= arr[pivot]) {
			let temp = arr[p2];
			arr[p2] = arr[p1];
			arr[p1] = temp;

			p1++;
		}
	}

	// swap pivot with current p1 (border of sorted numbers)
	let temp = arr[pivot];

	arr[pivot] = arr[p1];
	arr[p1] = temp;

	pivot = p1;

	quick_sort(arr, lo, pivot - 1);
	quick_sort(arr, pivot + 1, hi);	


}

let arr = [5, 2, 7, 2, 5, 3, 1, 7, 4];
quick_sort(arr, 0, arr.length - 1);

console.log(arr);
