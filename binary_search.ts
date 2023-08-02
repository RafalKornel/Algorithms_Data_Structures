/** Assumption is that arr is sorted. Without this assumption, this alg does not work */

function binary_search(arr: number[], el: number): number {
  if (arr.length === 0) return Infinity;
  if (arr.length === 1) return arr[0] === el ? 0 : Infinity;

  const middle_index = Math.floor(arr.length / 2);
  const middle_element = arr[middle_index];

  if (middle_element > el) return binary_search(arr.slice(0, middle_index), el);

  if (middle_element < el)
    return (
      middle_index + binary_search(arr.slice(middle_index, arr.length), el)
    );

  if (middle_element === el) return middle_index;

  return Infinity;
}

function binary_search_iterative(haystack: number[], needle: number) {
  let lo = 0;
  let hi = haystack.length;

  do {
    let m = lo + Math.floor((hi - lo) / 2);

    if (haystack[m] === needle) return m;

    if (haystack[m] < needle) {
      lo = m + 1;
    } else {
      hi = m;
    }
  } while (lo < hi);

  return Infinity;
}

console.log("Inf", binary_search_iterative([1, 2, 3, 4, 5, 6], 0));
console.log(0, binary_search_iterative([1, 2, 3, 4, 5, 6], 1));
console.log(1, binary_search_iterative([1, 2, 3, 4, 5, 6], 2));
console.log(2, binary_search_iterative([1, 2, 3, 4, 5, 6], 3));
console.log(3, binary_search_iterative([1, 2, 3, 4, 5, 6], 4));
console.log(4, binary_search_iterative([1, 2, 3, 4, 5, 6], 5));
console.log(5, binary_search_iterative([1, 2, 3, 4, 5, 6], 6));
console.log("Inf", binary_search_iterative([1, 2, 3, 4, 5, 6], 7));
console.log("Inf", binary_search_iterative([1, 2, 3, 4, 5], 7));
console.log(2, binary_search_iterative([1, 2, 3, 4, 5], 3));
