/** Sorts input array in place */
export function quick_sort(arr: number[], lo = 0, hi = arr.length - 1) {
  // invalid input
  if (arr.length === 0 || lo < 0 || hi >= arr.length) return;

  // base condition
  if (hi <= lo) return;

  let pivot = hi;
  let p1 = lo;

  for (let p2 = lo; p2 < pivot; p2++) {
    if (arr[p2] <= arr[pivot]) {
      const temp = arr[p2];
      arr[p2] = arr[p1];
      arr[p1] = temp;

      p1++;
    }
  }

  // swap pivot with current p1 (border of sorted numbers)
  const temp = arr[pivot];

  arr[pivot] = arr[p1];
  arr[p1] = temp;

  pivot = p1;

  quick_sort(arr, lo, pivot - 1);
  quick_sort(arr, pivot + 1, hi);
}
