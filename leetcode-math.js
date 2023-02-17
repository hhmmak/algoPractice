/* 
Count Odd Numbers in an Interval Range 
*/

var countOdds = function(low, high) {
  if (high % 2 && low % 2) return Math.ceil((high - low + 1) / 2);
  return Math.floor((high - low + 1) / 2);
};