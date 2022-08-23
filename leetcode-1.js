/* 
* Find All Numbers Disappeared in an Array
* Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.
*
* Constraints:
* n == nums.length
* 1 <= n <= 105
* 1 <= nums[i] <= n
*
* maximize with O(n) time complexity and O(1) space complexity
*
* @param {number[]} nums
* @return {number[]}
*/

var findDisappearedNumbers = function (nums) {
  let arr = []; //arr for disappeared numbers

  // mark present number with '-' at matched index, i.e. negative number 
  for (let i = 0; i < nums.length; i++) {
    let n = Math.abs(nums[i]) - 1;  // abs for repeated present number
    nums[n] = (Math.abs(nums[n])) * -1;   // abs for repeated present number
  }

  // check which number is not present
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      arr.push(i + 1)
    }
  }

  return arr;
};
