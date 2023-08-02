/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var countGoodTriplets = function (arr, a, b, c) {
  let cache = new Map();


  // note: using dynamic programming here doesn't really increase performance, seems like Math.abs is more optimized than hashset lookup and insertion
  // + without hashset there isn't any memory allocation needed for cache (so space complexity is O(1) )
  function abs(i, j) {
    const first = i < j ? i : j;
    const second = i < j ? j : i;

    const key = `${first}|${second}`;

    const cachedResult = cache.get(key);

    if (cachedResult === undefined) {
      const res = Math.abs(arr[i] - arr[j]);
      cache.set(key, res);

      return res;
    } else {
      return cachedResult;
    }
  }

  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let k = arr.length - 1; k > i; k--) {
      for (let j = i + 1; j < k; j++) {
        const abs1 = abs(i, j);
        if (abs1 > a) continue;

        const abs2 = abs(j, k);
        if (abs2 > b) continue;

        const abs3 = abs(i, k);
        if (abs3 > c) continue;

        result++;
      }
    }
  }

  return result;
};

console.log(countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3));

console.log(countGoodTriplets([1, 1, 2, 2, 3], 0, 0, 1));
console.log(
  countGoodTriplets(
    [
      114,
      57,
      96,
      76,
      100,
      81,
      117,
      80,
      27,
      102,
      96,
      92,
      81,
      31,
      112,
      14,
      23,
      14,
      23,
      70,
      37,
      3,
      44,
      59,
      45,
      75,
      20,
      81,
      26,
      25,
      67,
      76,
      42,
      59,
      53,
      30,
      98,
      58,
      67,
      49,
      110,
      30,
      83,
      114,
      7,
      25,
      63,
      46,
      126,
      77,
      2,
      61,
      18,
      20,
      49,
      47,
      1,
      53,
      78,
      89,
      69,
      107,
      115,
      21,
      120,
      56,
      70,
      102,
      77,
      88,
      33,
      66,
      24,
      71,
      53,
      84,
      56,
      11,
    ],
    145,
    47,
    71,
  ),
);
