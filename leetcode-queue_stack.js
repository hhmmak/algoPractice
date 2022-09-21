/*
Queue using circular array of fixed size
*/

var MyCircularQueue = function(k) {
  this.queue = new Array(k);
	this.head = null;
	this.tail = null;
  this.max = k;

};

MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) {
		return false;
	}
	if (this.isEmpty()){
		this.head = 0;
		this.tail = 0;
	} else if (this.tail === this.max - 1){
		this.tail = 0;
	} else {
		this.tail ++;
	}
	this.queue[this.tail] = value;
	return true;

};

MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) {
		return false;
	}
	this.queue[this.head] = undefined;
	if (this.head === this.tail) {
    this.head = null;
		this.tail = null;
	} else if (this.head === this.max - 1){
		this.head = 0;
	} else {
		this.head ++;
	}

	return true;

};

MyCircularQueue.prototype.Front = function() {
  if (this.isEmpty()) {
		return -1;
	}
	return this.queue[this.head];

};

MyCircularQueue.prototype.Rear = function() {
  if (this.isEmpty()) {
		return -1;
	}
	return this.queue[this.tail];

};


MyCircularQueue.prototype.isEmpty = function() {
  if (this.head === null || this.tail === null) {
		return true;
	}
	return false;

};

MyCircularQueue.prototype.isFull = function() {
  if ( (this.tail === (this.max - 1) && this.head === 0) || (this.head - this.tail === 1) ) {
		return true;
	}
	return false;

};

/*
Number of Islands
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges
of the grid are all surrounded by water.

Example :
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constrain:
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

var numIslands = function(grid) {
  if (!grid) {
		return 0;
	}

  let island = 0;

	const check = (i, j) => {
		if (i < 0 || j < 0|| i >= grid.length || j >= grid[0].length || grid[i][j] !== "1") {
			return false;
		}
    
		grid[i][j] = "2";
		check(i, j + 1);
		check(i + 1, j);
    check(i, j - 1);
    check(i - 1, j);
		return true;
		
	}


	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
      if (check(i, j)) {
				island ++;
			}
		}
	}
	
	return island;

};