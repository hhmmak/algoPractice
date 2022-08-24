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
Pascal's Triangle
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