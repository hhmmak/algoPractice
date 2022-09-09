/*
.. Mimic Singly Linked List Class
*/

var MyNode = function(val, next) {
  this.value = val == undefined ? 0 : val;
  this.next = next == undefined ? undefined : next;
}

var MyLinkedList = function() {
	this.head = null;
  this.size = 0;
};

/** 
 * @param {number} index 
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  
	if (index < 0 || index >= this.size || this.head === null) {
    return -1;
  }
  
  let pt = this.head;
  for (let i = 0; i < index; i++) {
    pt = pt.next;
	}
	return pt.value;

};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  
  let newHead = new MyNode(val, this.head);
  this.head = newHead;
  
  this.size ++;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  let pt = this.head;
  let node = new MyNode(val);
	if (this.head === null) {
		this.head = node;
    this.size ++;
    return;
	}
	while (pt.next !== undefined){
		pt = pt.next;
  }

	pt.next = node;
  this.size ++;

};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
	if (index < 0 || index > this.size){
    return;
  }
  if (index === 0){
    this.addAtHead(val);
    return;
  }
  if (index === this.size){
    this.addAtTail(val);
    return;
  }
  
  
  let pt = this.head;
  for (let i = 0; i < index - 1; i ++) {
		pt = pt.next;
  }
  let prevNext = pt.next;
  pt.next = new MyNode(val, prevNext);
  
  this.size ++;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
	if (index < 0 || index >= this.size){
    return;
  }
  if (index === 0){
    this.head = this.head.next;
    this.size --;
    return;
  }
  
  let pt = this.head;
	for (let i = 0; i < index - 1; i ++) {
		pt = pt.next;
  }
  pt.next = pt.next.next;
  this.size --;
  
};

/*
.. Linked List Cycle Check
*/

/*
Constraints:
The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.

Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}
 */

// check presence of cycle
var hasCycle = function(head) {
    
  let fast = head;
  let slow = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow){
      return true;
    }
  }
  return false;

};

// check beginning of cycle
var detectCycle = function(head) {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow){
      let start = head;
      while (start !== slow){
        start = start.next;
        slow = slow.next;
      }
      return start;
    }
  }
  return null;
};