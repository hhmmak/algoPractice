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
