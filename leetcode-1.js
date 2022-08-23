/* 
Find All Numbers Disappeared in an Array

Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

Constraints:
n == nums.length
1 <= n <= 105
1 <= nums[i] <= n

maximize with O(n) time complexity and O(1) space complexity

@param {number[]} nums
@return {number[]}
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


/*
Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

Constraints:
1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums is sorted in non-decreasing order.

maximize with O(n) time complexity

@param {number[]} nums
@return {number[]}
 */

var sortedSquares = function(nums) {

  let i = 0;  //start from negative nums
  let j = nums.length - 1;  //start from positive nums
  let arr = new Array(nums.length);   //set up new array to store squared number, space complexity O(n)
  
  // compare until intersection of negative/positive nums
  while (i <= j){
      if (nums[j] * nums[j] > nums[i] * nums[i]){   // add and shift if square of negative number is larger
          arr[j - i] = (nums[j] * nums[j]);
          j --;
      } else {    //add and shift if squared of positive is larger or equal
          arr[j - i] = (nums[i] * nums[i]);   
          i ++;
      }
  }
  return arr;
};

/*
Find the Middle Index in Array

Given a 0-indexed integer array nums, find the leftmost middleIndex (i.e., the smallest amongst all the possible ones).
A middleIndex is an index where nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1].
If middleIndex == 0, the left side sum is considered to be 0. Similarly, if middleIndex == nums.length - 1, the right side sum is considered to be 0.

Return the leftmost middleIndex that satisfies the condition, or -1 if there is no such index.

Constraints:
1 <= nums.length <= 100
-1000 <= nums[i] <= 1000

@param {number[]} nums
@return {number}
 */


var findMiddleIndex = function(nums) {
  let pivot = 0;
  let sumL = 0;
  let sumR = nums.reduce((a, b) => a + b) - nums[0];
  if (sumR === 0){
      return 0;
  }
  while (pivot < nums.length - 1){
      pivot ++;
      sumL += nums[pivot - 1];
      sumR -= nums[pivot];
      if (sumL === sumR){
          return pivot;
      }
  }
  return -1;
};