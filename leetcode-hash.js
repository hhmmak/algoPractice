/**
 * ..Hash Set
 * set data structure, no repeated values
 * similar to array with no duplicate values
*/


var MyHashSet = function() {
  this.set = [];
};

/** 
* @param {number} key
* @return {void}
*/
MyHashSet.prototype.add = function(key) {
  if (this.set.indexOf(key) === -1) {
    this.set.push(key);
  }
};

/** 
* @param {number} key
* @return {void}
*/
MyHashSet.prototype.remove = function(key) {
  if (this.set.indexOf(key) !== -1){
    this.set.splice(this.set.indexOf(key), 1);
  }
};

/** 
* @param {number} key
* @return {boolean}
*/
MyHashSet.prototype.contains = function(key) {
  if(this.set.indexOf(key) === -1){
    return false;
  }
  return true;
};

/**
 * ..Hash Map
 * set data structure, no repeated values
 * similar to object with no duplicate values
*/


var MyHashMap = function() {
  this.map = {};
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
MyHashMap.prototype.put = function(key, value) {
  this.map[key] = value;
};

/** 
* @param {number} key
* @return {number}
*/
MyHashMap.prototype.get = function(key) {
  if (this.map[key] || this.map[key] === 0){
    return this.map[key];
  }
  return -1;
};

/** 
* @param {number} key
* @return {void}
*/
MyHashMap.prototype.remove = function(key) {
  this.map[key] = -1;
};

/*
Single Number
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.

Constraints:
1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
Each element in the array appears twice except for one element which appears only once.

@param {number[]} nums
@return {number}
*/

var singleNumber = function(nums) {
  // nums.sort((a,b) => a - b);
  // for (let i = 0; i < nums.length; i += 2){
  //   if (nums[i] !== nums[i + 1]){
  //     return nums[i];
  //   }
  // }
  
  let map = {};
  for (let value of nums){
    if (map[value]) {
      map[value] = false;
    } else {
      map[value] = true
    }
  }
  for (let value of nums) {
    if (map[value]){
      return value;
    }
  }
};

/**
*..Intersection of Two Arrays
*/

/*
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be UNIQUE and you may return the result in any order.
(search for common values between two arrays)

Constraints:
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000

@param {number[]} nums1
@param {number[]} nums2
@return {number[]}

Time Complexity O(n) Space Complexity O(n)
*/

var intersection = function(nums1, nums2) {
  let map = {};
  for (let value of nums1){
    if (!map[value]){
      map[value] = 1;
    }
  }
  for (let value of nums2){
    if (map[value]){
      map[value] = 2;
    }
  }
  
  let arr = [];
  for (let key in map){
    if (map[key] === 2){
      arr.push(key);
    }
  }
  return arr;
};

/*
Given two integer arrays nums1 and nums2, return an array of their intersection. 
Each element in the result must appear AS MANY TIMES AS IT SHOWS in both arrays and you may return the result in any order.

Constraints:
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000

@param {number[]} nums1
@param {number[]} nums2
@return {number[]}
*/

//first attempt : hash map, count occurence
// var intersect = function(nums1, nums2) {
//   let arr = [];
//   let map = {};
//   for (let value of nums1){
//     map[value] = (map[value] || 0) + 1;
//   }

//   for (let value of nums2){
//     if (map[value]){
//       arr.push(value);
//       map[value] --;
//     }
//   }
// return arr;
// };

// second attempt : sort first, two pointer 
// var intersect = function(nums1, nums2) {
//   nums1.sort((a,b) => a - b);
//   nums2.sort((a,b) => a - b);
//   let p1 = 0;
//   let p2 = 0;
//   let arr = [];
  
//   while (p1 < nums1.length && p2 < nums2.length){
//     if (nums1[p1] === nums2[p2]){
//       arr.push(nums1[p1]);
//       p1 ++;
//       p2 ++;
//     } else if (nums1[p1] > nums2[p2]) {
//       p2 ++;
//     } else if (nums1[p1] < nums2[p2]) {
//       p1 ++;
//     }
//   }
//   return arr;
// };

// third attempt : check short array, faster runtime than attempt 1;
var intersect = function(nums1, nums2) {
  let arr = []
  let map = {};
  
  let short = [...nums2];
  let long = [... nums1];
  if (nums1.length < nums2.length){
    let short = [...nums1];
    let long = [... nums2];
  }
  
  for (let value of short){
    map[value] = (map[value] || 0) + 1;
  }
  
  for (let value of long) {
    if (map[value]){
      arr.push(value);
      map[value] --;
    }
  }
  
  return arr;
};



/*
Happy Number
Write an algorithm to determine if a number n is happy.
A happy number is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

Constraints:
1 <= n <= 231 - 1

@param {number} n
@return {boolean}
*/

// hash method
var isHappy = function(n) {
  let map = {};
  while (n !== 1){
    let arr = n.toString().split('');
    n = arr.reduce((a,b) => a + b * b, 0)

    //detect repeat presence of sum of digit, i.e. entered a loop since sum of digit will not change
    if (n < 100){
      if (map[n]){
        return false;
      }
      map[n] = true;
    }
  }
  return true;
};

/*
Two Sum
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Constraints:
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

@param {number[]} nums
@param {number} target
@return {number[]}
*/

var twoSum = function(nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(map[nums[i]])) {
      map[target - nums[i]] = i;
    } else {
      return [ map[nums[i]], i ];
    }
  }
};

/*
Isomorphic Strings
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. 
No two characters may map to the same character, but a character may map to itself.

Constraints:
1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.
*/

var isIsomorphic = function(s, t) {
  let mapS = {};
  let mapT = {};
  for (let i = 0; i < s.length; i ++){
    //assign unique non-zero number to characters in same location, i.e. shift characters in same location to same reference number
    mapS[s[i]] = mapS[s[i]] || i + 1;
    mapT[t[i]] = mapT[t[i]] || i + 1;
    if (mapS[s[i]] !== mapT[t[i]]) {
      return false;
    }
  }
  return true;
};

/*
Minimum Index Sum of Two Lists

Given two arrays of strings list1 and list2, find the common strings with the least index sum.
A common string is a string that appeared in both list1 and list2.
A common string with the least index sum is a common string such that if it appeared at list1[i] and list2[j] then i + j should be the minimum value among all the other common strings.
Return all the common strings with the least index sum. Return the answer in any order.

Constraints:
1 <= list1.length, list2.length <= 1000
1 <= list1[i].length, list2[i].length <= 30
list1[i] and list2[i] consist of spaces ' ' and English letters.
All the strings of list1 are unique.
All the strings of list2 are unique.

@param {string[]} list1
@param {string[]} list2
@return {string[]}
*/

//first attempt
// var findRestaurant = function(list1, list2) {
//   let map = {};
//   let length = Math.max(list1.length, list2.length)
//   let min = list1.length + list2.length;
//   let common = [];
//   for (let i = 0; i < length; i++){
    
//     if (i < list1.length && !map[list1[i]]){
//       map[list1[i]] = [];

//     }
//     if (i < list2.length && !map[list2[i]]){
//       map[list2[i]] = [];

//     }    
//     if (i < list1.length && map[list1[i]]){
//       map[list1[i]].push(i);

//     }
//     if (i < list2.length && map[list2[i]]){
//       map[list2[i]].push(i);
//     }

    
//     if (i < list1.length && map[list1[i]].length === 2) {
//       if (map[list1[i]][0] + map[list1[i]][1] === min){
//         common.push(list1[i]);
//       } else if (map[list1[i]][0] + map[list1[i]][1] < min){
//         min = map[list1[i]][0] + map[list1[i]][1];
//         common = [list1[i]];
//       }
//     }
    
//     if (i < list2.length && map[list2[i]].length === 2 && list1[i] !== list2[i]){
//       if (map[list2[i]][0] + map[list2[i]][1] === min){
//         common.push(list2[i]);
//       } else if (map[list2[i]][0] + map[list2[i]][1] < min){
//         min = map[list2[i]][0] + map[list2[i]][1];
//         common = [list2[i]];
//       }
//     }
  
//   }
//   return common;
  
// };

//second attempt
// var findRestaurant = function(list1, list2) {
//   let map = {};
//   let min = list1.length + list2.length;
//   let common = [];
  
//   list1.map((value, i) => map[value] = [i]);
  
  
//   for (let i = 0; i < list2.length; i++){

//     if (i < list2.length && map[list2[i]]){
//       map[list2[i]].push(i);
//     }

//     if (map[list2[i]] && map[list2[i]].length === 2){
//       if (map[list2[i]][0] + map[list2[i]][1] === min){
//         common.push(list2[i]);
//       } else if (map[list2[i]][0] + map[list2[i]][1] < min){
//         min = map[list2[i]][0] + map[list2[i]][1];
//         common = [list2[i]];
//       }
//     }
  
//   }
//   return common;
  
// };

//third attempt
var findRestaurant = function(list1, list2) {
  let map = {};
  let min = list1.length + list2.length;
  let common = [];
  
  list1.map((value, i) => map[value] = i);
  

  for (let i = 0; i < list2.length; i++){
    if (!isNaN(map[list2[i]])){
      if (map[list2[i]] + i === min){
        common.push(list2[i]);
      } else if (map[list2[i]] + i < min){
        min = map[list2[i]] + i;
        common = [list2[i]];
      }
    }
  
  }
  return common;
  
};

/*
Group Anagrams
Given an array of strings strs, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Constraints:
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

@param {string[]} strs
@return {string[][]}
*/

var groupAnagrams = function(strs) {
  let map = {};  
  for (let i = 0; i < strs.length; i++){
      let compare = strs[i].split('').sort().join('');
      if (map[compare]){
        map[compare].push(strs[i]);
      } else {
        map[compare] = [strs[i]];
      }
  }
  
  return Object.values(map);
};

/*
Valid Sudoku
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

Example:
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Constraints:
board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.

@param {character[][]} board
@return {boolean}
*/

var isValidSudoku = function(board) {
  let square = {}; // map for 3*3 grid check
  for (let i = 0; i < 9; i ++) {

    //reset upon new line
    let row = {};
    let column = {};

    for (let j = 0; j < 9; j++){

      //set up new map for each 3*3 grid
      //can be replaced by for loop i = 0 to 8 where square[i] = {}
      if (!(i % 3 || j % 3)) {
        square[Math.floor(i / 3) * 3 + Math.floor(j / 3)] = {};
      }

      // check row & all grids
      if (board[i][j] !== '.') {
        if (row[board[i][j]]){
          return false
        } else {
          row[board[i][j]] = 1;
        }

        //check grid
        if (square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][board[i][j]]) {
          return false; 
        } else {
          square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][board[i][j]] = 1;
        }
      }

      // check column
      if (board[j][i] !== '.') {
        if (column[board[j][i]]){
          return false;
        } else {
          column[board[j][i]] = 1;
        }
      }
    }
  }
  return true;
}

/*
Find Duplicate Subtrees
Given the root of a binary tree, return all duplicate subtrees.
For each kind of duplicate subtrees, you only need to return the root node of any one of them.
Two trees are duplicate if they have the same structure with the same node values.

Constraints:
The number of the nodes in the tree will be in the range [1, 10^4]
-200 <= Node.val <= 200

Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

@param {TreeNode} root
@return {TreeNode[]}
*/

var findDuplicateSubtrees = function(root) {
  let map = {};
  let result = [];
  
  let findNode = (ptr) => {
    if (!ptr){
      return 'null';
    }
  
    let subtree = `${ptr.val}, ${findNode(ptr.left)}, ${findNode(ptr.right)}`;
    
    if (map[subtree] === 1){
      result.push(ptr);
    }
    map[subtree] = (map[subtree] || 0) + 1;
    
    return subtree;
  }
  
  findNode(root);
  return result;
};


/*
Longest Substring Without Repeating Characters
Given a string s, find the length of the longest substring without repeating characters.

Constraints:
0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.

@param {string} s
@return {number}
*/

//first attempt: brute force
var lengthOfLongestSubstring = function(s) {
  let sMax = 0;
  
  for (let i = 0; i < s.length; i++){
    let j = i;
    let map = {};
    while (!map[s[j]] && j < s.length){
      map[s[j]] = 1;
      j ++;
    }
    sMax = Math.max(sMax, j - i);
  }
  return sMax;
};

//second attempt: sliding window
var lengthOfLongestSubstring = function(s) {
  let sMax = 0;
  let j = 0;
  let map = {};
  
  for (let i = 0; i < s.length; i++){
    if (map[s[i]]) {
      j = Math.max(j, map[s[i]]);
    }
    map[s[i]] = i + 1;
    sMax = Math.max(sMax, map[s[i]] - j);
  }
  return sMax;
};

/*
4SumII
Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that:
0 <= i, j, k, l < n
nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

Constraints:
n == nums1.length
n == nums2.length
n == nums3.length
n == nums4.length
1 <= n <= 200
-228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228

@param {number[]} nums1
@param {number[]} nums2
@param {number[]} nums3
@param {number[]} nums4
@return {number}
*/

var fourSumCount = function(nums1, nums2, nums3, nums4) {
  let map = {};
  let count = 0;
  
  for (let i = 0; i < nums1.length; i++){
    for (let j = 0; j < nums2.length; j++){
      map[nums1[i] + nums2[j]] = (map[nums1[i] + nums2[j]] || 0) + 1;
    }
  }
  
  for (let i = 0; i < nums3.length; i++){
    for (let j = 0; j < nums4.length; j++){
      if (map[-1 * (nums3[i] + nums4[j])]){
        count += map[-1 * (nums3[i] + nums4[j])];
      }
    }
  }
  
  return count;
};