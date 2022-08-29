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