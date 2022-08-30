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

/*
Intersection of Two Arrays
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.
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