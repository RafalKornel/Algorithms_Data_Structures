/** Assumption is that arr is sorted. Without this assumption, this alg does not work */

export function binarySearchRecursive(arr: number[], el: number): number {
  if (arr.length === 0) return Infinity;
  if (arr.length === 1) return arr[0] === el ? 0 : Infinity;

  const middle_index = Math.floor(arr.length / 2);
  const middle_element = arr[middle_index];

  if (middle_element > el)
    return binarySearchRecursive(arr.slice(0, middle_index), el);

  if (middle_element < el)
    return (
      middle_index +
      binarySearchRecursive(arr.slice(middle_index, arr.length), el)
    );

  if (middle_element === el) return middle_index;

  return Infinity;
}

export function binarySearchIterative(haystack: number[], needle: number) {
  let lo = 0;
  let hi = haystack.length;

  do {
    const m = lo + Math.floor((hi - lo) / 2);

    if (haystack[m] === needle) return m;

    if (haystack[m] < needle) {
      lo = m + 1;
    } else {
      hi = m;
    }
  } while (lo < hi);

  return Infinity;
}
