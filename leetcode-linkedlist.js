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

/*
Intersection of two linked list
*/

//first attempt : loop until intersection found
var getIntersectionNode = function(headA, headB) {

  let ptA = headA;
  let ptB = headB;
  
  while (ptA !== ptB){
    ptA = ptA.next;
    ptB = ptB.next;
  if (ptA === null && ptB === null){
      return null;
  }
    if (ptA === null) {
      ptA = headA;
    }
    if (ptB === null) {
      ptB = headB;
    }
  }
  return ptA;

};

//second attempt : take advantage of a.length + b.length = b.length + a.length
//total time O (2n) : loop through both twice total at most
var getIntersectionNode = function(headA, headB) {

  let ptA = headA;
  let ptB = headB;
  
  while (ptA !== ptB){
    ptA = ptA.next;
    ptB = ptB.next;
    if (ptA === null && ptB === null){
        return null;
    }

    //flip 
    if (ptA === null) {
      ptA = headB;
    }
    if (ptB === null) {
      ptB = headA;
    }
  }
  return ptA;

};

//third attempt : refactoring
var getIntersectionNode = function(headA, headB) {

  let ptA = headA;
  let ptB = headB;
  
  while (ptA !== ptB){
    ptA = ptA ? ptA.next : headB;
    ptB = ptB ? ptB.next : headA;

  }
  return ptA;

};

/*
Remove Nth Node From End of List
Given the head of a linked list, remove the nth node from the end of the list and return its head.

Constraints:
The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
*/

var removeNthFromEnd = function(head, n) {
  let fast = head;
  let node = head;
  
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  if (fast === null){
    head = head.next;
    return head;
  }
  while (fast.next !== null){
    fast = fast.next;
    node = node.next;
  }
  node.next = node.next.next;
  
  return head;
};

/*
.. Reverse Linked List
*/

// recursion method
var reverseList = function(head) {
  const reverse = (node, prevHead = null) => {
    if (node === null){
      return prevHead;
    }
    let remain = node.next;
    node.next = prevHead;
    return reverse(remain, node);
  }
  
  return reverse(head);
  
};

//while loop
var reverseList = function(head) {
  let prevHead = null;
  while (head !== null){
    let remain = head.next;
    head.next = prevHead;
    prevHead = head;
    head = remain;
  }
  
  return prevHead;

};