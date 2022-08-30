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