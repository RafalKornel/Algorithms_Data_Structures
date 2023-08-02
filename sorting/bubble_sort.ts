function bubble_sort(arr: number[]) {
	for (let i = 0; i < arr.length - 1; i++ ){
		for (let j = 0; j < arr.length - 1; j++) { 
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = temp;
			 }
		}
	}
	
	return arr;
}

let a = [5, 1, 3, 6, 3, 5];

console.log(bubble_sort(a));
