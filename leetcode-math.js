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

/**
 * 2094. Finding 3-Digit Even Numbers
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function(digits) {
    let map = new Array(10).fill(0)
    let result = []

    digits.forEach(digit => {
        map[digit] ++
    })

    for (let hundreth = 1; hundreth < 10; hundreth ++){
        if (map[hundreth]){
            map[hundreth] --;
            for (let tenth = 0; tenth < 10; tenth ++){
                if (map[tenth]){
                    map[tenth] --;
                    for(let unit = 0; unit < 10; unit +=2 ){
                        if (map[unit]){
                            map[unit]--;
                            result.push(100 * hundreth + 10 * tenth + unit)
                            map[unit] ++;
                        }
                    }
                    map[tenth] ++;
                }
            }
            map[hundreth]++
        }
    }

    return result
};
