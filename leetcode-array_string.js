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

var sortedSquares = function (nums) {

  let i = 0;  //start from negative nums
  let j = nums.length - 1;  //start from positive nums
  let arr = new Array(nums.length);   //set up new array to store squared number, space complexity O(n)

  // compare until intersection of negative/positive nums
  while (i <= j) {
    if (nums[j] * nums[j] > nums[i] * nums[i]) {   // add and shift if square of negative number is larger
      arr[j - i] = (nums[j] * nums[j]);
      j--;
    } else {    //add and shift if squared of positive is larger or equal
      arr[j - i] = (nums[i] * nums[i]);
      i++;
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


var findMiddleIndex = function (nums) {
  let pivot = 0;
  let sumL = 0;
  let sumR = nums.reduce((a,b) => a + b) - nums[0];
  if (sumR === 0) {
    return 0;
  }
  while (pivot < nums.length - 1) {
    pivot++;
    sumL += nums[pivot - 1];
    sumR -= nums[pivot];
    if (sumL === sumR) {
      return pivot;
    }
  }
  return -1;
};

/*
Plus One
You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. 
The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
Increment the large integer by one and return the resulting array of digits.

Constraints:
1 <= digits.length <= 100
0 <= digits[i] <= 9
digits does not contain any leading 0's.

@param {number[]} digits
@return {number[]}
*/

var plusOne = function (digits) {
  digits[digits.length - 1]++;
  if (digits[digits.length - 1] === 10) {
    for (let i = digits.length - 1; i > 0; i--) {
      if (digits[i] === 10) {
        digits[i] = 0;
        digits[i - 1]++;
      } else {
        break;
      }
    }
  }
  if (digits[0] === 10) {
    digits[0] = 0;
    digits.unshift(1);
  }
  return digits;
};
/*
Diagonal Tranverse
Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Constraints:
m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
-105 <= mat[i][j] <= 105

@param {number[][]} mat
@return {number[]}
*/

var findDiagonalOrder = function (mat) {
  let arr = [];
  let i = 0;
  let j = 0;
  let m = mat[0].length - 1;
  let n = mat.length - 1;
  while (i !== m || j !== n) {
    arr.push(mat[j][i]);
    if ((i + j) % 2) {      // goes down
      if (j === n) {
        i++;
      } else if (i === 0) {
        j++;
      } else {
        i--;
        j++;
      }
    } else {        //goes up
      if (i === m) {
        j++;
      } else if (j === 0) {
        i++;
      } else {
        i++;
        j--;
      }
    }
  }
  arr.push(mat[j][i]);
  return arr;
};

/*
Spiral Matrix
Given an m x n matrix, return all elements of the matrix in spiral order.
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Constraints:
m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

@param {number[][]} matrix
@return {number[]}
*/

var spiralOrder = function (matrix) {
  let arr = [];
  let mb = 0; //min of i
  let nb = 0; //min of j
  let me = matrix.length - 1;  // max of i
  let ne = matrix[0].length - 1;   // max of j
  while (mb <= me && nb <= ne) {
    for (let i = nb; i <= ne; i++) {
      arr.push(matrix[mb][i]);
    }
    if (mb > me || nb > ne) {
      break;
    }
    mb++;
    for (let i = mb; i <= me; i++) {
      arr.push(matrix[i][ne]);
    }
    ne--;
    if (mb > me || nb > ne) {
      break;
    }
    for (let i = ne; i >= nb; i--) {
      arr.push(matrix[me][i])
    }
    me--;
    if (mb > me || nb > ne) {
      break;
    }
    for (let i = me; i >= mb; i--) {
      arr.push(matrix[i][nb]);
    }
    nb++;
    if (mb > me || nb > ne) {
      break;
    }
  }
  return arr;
};

/*
Rotate Image (Rotate Matrix)
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
*/
var rotate = function(matrix) {
  let n = matrix.length;
  let axis = (n - 1) / 2;
  for (let i = 0; i < axis; i ++){
    for (let j = i; j < n - i - 1; j++){
      
      let y = i;
      let x = j;
      let prev = matrix[y][x];
      
      for (let count = 0; count < 4; count++){
        let newY = n - 1 - y;  //expension of y + (axis - y) * 2
        let next = matrix[x][newY];
        matrix[x][newY] = prev;
        prev = next;
        y = x;
        x = newY; 
      }
    }
  }
};


/** 
 * .. Pascal Triangle 
*/

/*
Given an integer numRows, return the first numRows of Pascal's triangle.

Constraints:
1 <= numRows <= 30

@param {number} numRows
@return {number[][]}
*/

var generate = function (numRows) {
  let arr = []
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        arr.push([1]);
      } else if (j === i) {
        arr[i].push(1);
      } else {
        arr[i].push(arr[i - 1][j] + arr[i - 1][j - 1]);
      }
    }
  }
  return arr;
};

/*
Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

Constraints:
0 <= rowIndex <= 33

@param {number} rowIndex
@return {number[]}

Time complexity O(n) Space complexity O(n)
*/

var getRow = function(rowIndex) {
  if (rowIndex === 0){
    return [1];
  }
  let row = getRow(rowIndex - 1);
  let valueBefore = row[0];
  for (let i = 1; i < rowIndex; i++){
    let valueNow = row[i];
    row[i] = valueBefore + valueNow;
    valueBefore = valueNow;
  }
  row.push(1);
  return row;
};

/*
Add Binary
Given two binary strings a and b, return their sum as a binary string.

@param {string} a
@param {string} b
@return {string}
*/

var addBinary = function (a,b) {
  let long = (a.length >= b.length) ? a : b;
  let short = (a.length < b.length) ? a : b;

  long = long.split('').reverse();
  short = short.split('').reverse();

  for (let i = 0; i < short.length; i++) {
    long[i] = Number(long[i]) + Number(short[i]);
  }
  for (let i = 0; i < long.length; i++) {
    if (long[i] === 2) {
      long[i] = '0';
      long[i + 1] = Number(long[i + 1]) + 1 || '1';
    } else if (long[i] === 3) {
      long[i] = '1';
      long[i + 1] = Number(long[i + 1]) + 1 || '1';
    }
  }
  return long.reverse().join('');
};

/*
Implement strStr()
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Constraints:
1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.

time complexity O(n * m) space complexity O(1)

 * @param {string} haystack
 * @param {string} needle
 * @return {number}
*/

var strStr = function (haystack,needle) {

  let exist = false;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      exist = true;
      for (let j = 1; j < needle.length; j++) { //check if whole needle matches without changing starting index - prevent partial needle match duplicate within haystack
        if (haystack[i + j] !== needle[j]) {
          exist = false;
          break;
        }
      }
      if (exist) {
        return i;
      }
    }
  }
  return -1;
};


/*
Minimum Size Subarray Sum
Given an array of positive integers nums and a positive integer target, 
return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. 
If there is no such subarray, return 0 instead.

Constraints:

1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 104


*/
var minSubArrayLen = function(target, nums) {
  let sum = 0;
  let left = 0;
  let amount = nums.length + 1;
  for( let i = 0; i < nums.length; i++){
    sum += nums[i];
    while (sum >= target){
      if (amount > (i - left + 1)){
        amount = i - left + 1;
      }
      sum -= nums[left];
      left ++;
    }
  }
  
  if (amount > nums.length){
    return 0;
  }
  
  return amount; 
}

/*
Rotate Array
Given an array, rotate the array to the right by k steps, where k is non-negative.

Constraints:
1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
0 <= k <= 105

@param {number[]} nums
@param {number} k
@return {void} Do not return anything, modify nums in-place instead.
*/

var rotate = function(nums, k) {
  let shiftNums = nums.splice(nums.length - (k % nums.length));
  nums.splice(0,0,...shiftNums);
};

/*
Remove Duplicates from Sorted Array

Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. 
The relative order of the elements should be kept the same.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Constraints:
1 <= nums.length <= 3 * 104
-100 <= nums[i] <= 100
nums is sorted in non-decreasing order.

@param {number[]} nums
@return {number}
*/

var removeDuplicates = function(nums) {
  let i = 0;
  let k = 0;
  while (i < nums.length) {
      if (nums[i] === nums[k] ){
          i ++;
      } else {
          nums[k + 1] = nums [i];
          k ++;
          i ++;
      }
  }
  return k + 1;
};

/*
Where Will the Ball Fall
*/

var findBall = function(grid) {
  let answer = [];
  let m = grid.length;  // y-axis
  let n = grid[0].length; // x-axis

  for (let i = 0; i < n; i ++){
    let x = i;
    let y = 0;
    let drop = true;
    while (y < m && drop && x >= 0 && x < n){
      let dir = grid[y][x];
      if (x >= 0 && x < n && grid[y][x] === grid[y][x + dir]) {
        x = x + dir;
        y ++;
      } else {
        drop = false;
      }
    }
    if (drop) {
      answer.push(x);
    } else {
      answer.push(-1);
    }
  }
  return answer;
};

/*
Find K Closest Elements
Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:
|a - x| < |b - x|, or
|a - x| == |b - x| and a < b
*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {
  if (arr.length === k) {
    return arr;
  }
  if (x <= arr[0]){
    return arr.slice(0, k);
  }
  if (x >= arr[arr.length - 1]){
    return arr.splice(-k);
  }

  let high = arr.length - 1;
  let low = 0;
  let mid = Math.floor((high + low) / 2);

  while (arr[mid] !== x && high > low){
    
    if (arr[mid] < x){
      low = mid + 1;
    } else if (arr[mid] > x) {
      high = mid - 1;
    }
    mid = Math.floor((high + low) / 2);
  }

  if (arr[mid] === x || x - arr[mid] <= arr[mid + 1] - x){
    high = mid - 1;
    low = mid;
  } else if (x - arr[mid - 1] <= arr[mid] - x) {
    high = mid - 2;
    low = mid - 1;
  } else {
    high = mid;
    low = mid + 1;
  }
  while (k > 0){
    if (low - 1 < 0){
      high ++;
    } else if (high + 1 >= arr.length || x - arr[low - 1] <= arr[high + 1] - x){
      low --;
    } else {
      high ++;
    }
    k --;
  }
  
  return arr.slice(low, high + 1);
  
};

/*
Multiply Strings
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.
Constraints:
1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
*/

var multiply = function(num1, num2) {
  if (num1 === "0" || num2 === "0"){
    return "0";
  }
  if (num1 === "1"){
    return num2;
  }
  if (num2 === "1"){
    return num1;
  }

  let ans = 0;

  let arr1 = num1.split('');
  let arr2 = num2.split('');

  arr1.reverse();
  arr2.reverse();

  let map = {}

  for (let i = 0; i < arr1.length; i++){
    for (let j = 0; j < arr2.length; j++){
      let mul = arr1[i] * arr2[j];
      map[i + j] = map[i + j] ? map[i + j] + mul : mul;
      // console.log(Math.pow(10,i) * short[i] * Math.pow(10,j) * long[j]);
    }
  }
  let n = 0;
  let num = "";
  while (map[n] !== undefined){
    let temp = map[n] % 10;
    num = temp + num;
    temp = Math.floor(map[n] / 10);
    if (temp) {
      map[n + 1] = map[n + 1] ? map[n + 1] + temp : temp;
    }
    n ++;
  }

  return num;
};

/*
Longest Palindrome by Concatenating Two Letter Words
*/

var longestPalindrome = function(words) {
  if (words.length === 1){
    if (words[0][0] === words[0][1]){
      return 2;
    }
    return 0;
  }
  
  if (words.length === 2){
    if (words[0][0] === words[1][1] && words[0][1] === words[1][0]){
      return 4;
    }
    if (words[0][0] === words[0][1] || words[1][0] === words[1][1]) {
      return 2;
    }
    return 0;
  }

  let map = {};
  let mapR = {};
  for (let i = 0; i < words.length; i++){
    let reverse = `${words[i][1]}${words[i][0]}`;
    if (words[i][0] !== words[i][1] && map[reverse] !== undefined){
      mapR[reverse] = mapR[reverse] === undefined ? 1 : mapR[reverse] + 1;
    } else {
      map[words[i]] = map[words[i]] === undefined ? 1 : map[words[i]] + 1;
    }
  }

  let ans = 0;
  let noSingle = true;
  for (let key in map){
    if (key[0] === key[1]){
      ans += 4 * Math.floor(map[key] / 2);
      if (map[key] % 2 && noSingle){
        ans += 2;
        noSingle = false;
      }
    } else if (mapR[key] !== undefined){
      ans += 4 * Math.min(map[key], mapR[key]);
    }
  }
  
  return ans;
};

/*
Search in Rotated Sorted Array
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.
*/

// Binary Search
var search = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  let min = 0;

  while (low < high){
    min = Math.floor((low + high) / 2);
    if (nums[min] > nums[high]){
      low = min + 1;
    } else {
      high = min;
    }
  }
  min = high;
  let mid = nums.length - 1;
  high = 0;
  low = 0
  if (nums[mid] > target){
    low = min;
    high = mid - 1;
  } else if (nums[mid] < target) {
    high = min - 1;
    low = 0;
  } else {
    return mid;
  }

  while (low <= high){
    mid = Math.floor((low + high) / 2)
    
    if (nums[mid] === target){
      return mid;
    }
    if (target > nums[mid]){
      low = mid + 1;
    } else {
      high = mid - 1;
    }
    
  }

  return -1;
};

/*
Product of Array Except Self
*/

var productExceptSelf = function(nums) {
  if (nums.length === 2){
    return [nums[1], nums[0]];
  }
  
  let left = [1];
  for (let i = 0; i < nums.length - 1; i++){
    left.push(left[i] * nums[i]);
  }
  let right = [1];
  for (let i = 0; i < nums.length - 1; i++){
    right.unshift(right[0] * nums[nums.length - 1 - i]);
  }
  let result = [];
  for (let i = 0; i < nums.length; i++){
    result.push(left[i] * right[i]);
  }
  
  return result;
};

/*
Maximum Subarray
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
A subarray is a contiguous part of an array.
*/

var maxSubArray = function(nums) {
  if (nums.length === 1){
    return nums[0];
  }
  let length = nums.length;
  let max = nums[0];
  let prev = nums[0];
  
  for (let i = 1; i < length; i++){
    let sum = (prev > 0 ? prev : 0) + nums[i];
    max = Math.max(max, sum);
    prev = sum;
  }
  
  return max;
};

/*
Maximum Product Subarray
Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.
A subarray is a contiguous subsequence of the array.
*/

var maxProduct = function(nums) {
  let prev = 1;
  let max = nums[0];
  
  for (let i = 0; i < nums.length; i++){
    let product = prev * nums[i];
    max = Math.max(max, product);
    prev = product || 1;
  }
  
  prev = 1;
  
  for (let i = nums.length - 1; i >= 0; i--){
    let product = prev * nums[i];
    max = Math.max(max, product);
    prev = product || 1;
  }
  
  return max;
};

/*
Find Minimum in Rotated Sorted Array
*/

var findMin = function(nums) {
  let low = 0;
  let high = nums.length - 1;
  
  while (low < high){
    let mid = Math.floor((low + high) / 2);
    if (nums[high] < nums[mid]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nums[high];
};

/*
3Sum
Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
*/

var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  let result = [];
  
  for (let first = 0; first < nums.length - 2; first ++){
    if (first > 0 && nums[first] === nums[first - 1]){
      continue;
    }
    let second = first + 1;
    let third = nums.length - 1;
    let map = {};
    
    while (second < third) {
      let sum = nums[first] + nums[second] + nums[third];
      if (sum < 0){
        second ++;
      } else if (sum > 0){
        third --;
      } else {
        result.push([nums[first], nums[second], nums[third]])
        second ++;
        third --;
        while (second < third && nums[second] === nums[second - 1]){
          second ++;
        }
        while (second < third && nums[third] === nums[third + 1]){
          third --;
        }
      }
    }
  }
  return result;
};

/*
4Sum
Given an array nums of n integers, return an array of all the unique quadruplets
*/

var fourSum = function(nums, target) {
  nums.sort((a,b) => a - b);
  let result = [];
  
  for (let a = 0; a < nums.length - 3; a++){
    while (a > 0 && nums[a] === nums[a - 1]){
      a ++;
    }
    let sumA = target - nums[a];
    for (let b = a + 1; b < nums.length - 2; b++){
      while (b > a + 1 && nums[b] === nums[b - 1]){
        b ++;
      }
      let c = b + 1;
      let d = nums.length - 1;
      let sumB = sumA - nums[b];
      while (c < d){
        if (nums[c] + nums[d] > sumB){
          d --;
        } else if (nums[c] + nums[d] < sumB){
          c ++;
        } else {
          result.push([nums[a], nums[b], nums[c], nums[d]])
          c ++;
          while (nums[c] === nums[c - 1]){
            c ++;
          }
          d --;
          while (nums[d] === nums[d + 1]){
            d ++;
          }
        }
      }
    }
  }
  return result;
};

/*
Container With Most Water
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.
*/

var maxArea = function(height) {

  let indexS = 0;
  let indexE = height.length - 1;
  let lineS = height[indexS];
  let lineE = height[indexE];
  let lineMin = Math.min(lineS, lineE);
  let areaMax = (indexE - indexS) * lineMin;

  while (indexS < indexE){
    while (indexS < indexE && lineMin >= height[indexE]){
      indexE --;
    }
    while (indexS < indexE && lineMin >= height[indexS]){
      indexS ++;
    }
    
    lineS = height[indexS];
    lineE = height[indexE];
    lineMin = Math.min(lineS, lineE);
    
    areaMax = Math.max(areaMax, (indexE - indexS) * lineMin);
  }

  return areaMax;
};

/*
Longest Repeating Character Replacement
*/

var characterReplacement = function(s, k) {
  let map = {};
  let maxLength = k;
  
  for (let i = 0; i < s.length - k; i ++){
    let replace = k;
    let j = i;
    let length = 0;
    while (j < s.length && (replace > 0 || s[j] === s[i])){
      if (s[j] !== s[i]){
        replace --;
      } else if (j - i === 1){
        i ++;
      }
      length ++;
      j++;
    }
    length = Math.min(s.length, length + replace);
    maxLength = Math.max(maxLength, length);
  }
  return maxLength;
};

/*
Minimum Window Substring
*/

//Sliding window

var minWindow = function(s, t) {
  let map = {};
  let search = t.length;
  let minLength = s.length + 1;
  for (let i = 0; i < search; i++){
    map[t[i]] = (map[t[i]] || 0) + 1;
  }
  
  let start = 0;
  let end = 0;
  let head = 0;

  while (s.length > end){
    if (map[s[end]] > 0){
      search --;
    }
    if (map[s[end]] !== undefined){
      map[s[end]] --;
    }
    end ++;
    
    let count = 0;
    while (search === 0) {
      
      if (end - start < minLength){
        minLength = end - start;
        head = start;
      }

      if (map[s[start]] !== undefined) {
        map[s[start]] ++;
      }
      if (map[s[start]] > 0) {
        search ++;
      }
      start ++;
    }
  }
  
  return minLength === s.length + 1? "" : s.slice(head, head + minLength);
};

/*
Longest Palindromic Substring
*/

var longestPalindrome = function(s) {
  if (s.length === 1){
    return s;
  }
  
  let start = 0;
  let end = 1;
  
  let substring = s[0];
  let maxLength = 1;
  let head = 0;
  
  while (end < s.length){
    let find = true;
    while (end < s.length && find){
      if (s[start] === s[end]){
        find = false;
        while (end < s.length && s[start] === s[end + 1]){
          end ++;
        }
      } else if (end + 1 < s.length && s[start] === s[end + 1]){
        find = false;
        end = end + 1;
      } else {
        start ++;
        end ++;
      }
    }
    if (find){
      return substring;
    }

    head = start + 1;
    while(start >= 0 && end < s.length && s[start] === s[end]) {
      if (end - start + 1 > maxLength) {
        substring = s.slice(start, end + 1);
        maxLength = end - start + 1;
      }
      start --;
      end ++;
    }
    start = head;
    end = start + 1;
  }
  return substring;
};

/*
Best Time to Buy and Sell Stock II
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
On each day, you may decide to buy and/or sell the stock. You can only hold at most one 
share of the stock at any time. However, you can buy it then immediately sell it on the same day.
Find and return the maximum profit you can achieve.


*/

var maxProfit = function(prices) {
  let buy = 0;
  let sell = 0;
  let profit = 0;
  
  while (sell < prices.length){
    if (sell + 1 >= prices.length || prices[sell + 1] < prices[sell]){
      profit += (prices[sell] - prices[buy]);
      buy = sell + 1;
    }
    sell ++;
  }

  return profit;
};

/*
Word Break
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.
*/

var wordBreak = function(s, wordDict) {
  let mapDict = {};
  let mapS = {};
  for (let i = 0; i < wordDict.length; i++){
    mapDict[wordDict[i]] = true;
  }
  
  for (let i = 0; i < s.length; i++){
    mapS[i] = mapDict[s.slice(0, i + 1)]? true : false;
    let j = i - 1;
    while (j >= 0 && !mapS[i]){
      if (mapS[j] && mapDict[s.slice(j + 1, i + 1)]){
          mapS[i] = true;
      }
      j --;
    }
  }
  return mapS[s.length - 1];
};

/*
Combination Sum IV
Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.
*/

var combinationSum4 = function(nums, target) {
  nums.sort((a, b) => a - b);
  let map = {};
  
  const sum = (total) => {
    if (total === 0){
      return 1;
    }
    if (total < nums[0]){
      return 0;
    }
    if (map[total] !== undefined){
      return map[total];
    }
    map[total] = 0;
    for (let i = 0; i < nums.length; i++){
      if (nums[i] > total){
        break;
      }
      map[total] += sum(total - nums[i]);
    }
    // console.log(total, map[total])
    return map[total];
  }
  
  return sum(target);
};