/* 
Count Odd Numbers in an Interval Range 
*/

var countOdds = function(low, high) {
  if (high % 2 && low % 2) return Math.ceil((high - low + 1) / 2);
  return Math.floor((high - low + 1) / 2);
};

/**
 * 2523. Closest Prime Numbers in Range
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function(left, right) {
  let primeCheck = new Array(right + 1).fill(true)
  primeCheck[0] = false
  primeCheck[1] = false
  let primeList = []

  // sieve of eratoshenes
  for (let i = 2; i <= right; i++){
      if (primeCheck[i]){
          for (let j = i; j <= right; j += i){
              primeCheck[j] = false
          }
          if (i >= left){
              primeList.push(i)
          }
      }
  }

  if (primeList.length < 2){
      return [-1, -1]
  }

  let result = [primeList[0], primeList[primeList.length - 1]]
  let minDiff = primeList[primeList.length - 1] - primeList[0]

  for (let i = 1; i < primeList.length; i++){
      if (primeList[i] - primeList[i - 1] < minDiff) {
          minDiff = primeList[i] - primeList[i - 1] 
          result = [primeList[i - 1], primeList[i]]
      }
  }

  return result
};
