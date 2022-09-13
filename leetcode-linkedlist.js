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

/*
Remove Linked List Elements
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.
*/

var removeElements = function(head, val) {

  while (head !== null && head.val === val){
    head = head.next;
  }
  
  let pt = head;
  while (pt !== null && pt.next !== null) {
    if (pt.next.val === val){
      pt.next = pt.next.next;
    } else {
      pt = pt.next;
    }
  }
  
  return head;
  
};

/*
Odd Even Linked List
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
The first node is considered odd, and the second node is even, and so on.
Note that the relative order inside both the even and odd groups should remain as it was in the input.
You must solve the problem in O(1) extra space complexity and O(n) time complexity.

Constraints:
The number of nodes in the linked list is in the range [0, 104].
-106 <= Node.val <= 106
*/

var oddEvenList = function(head) {
  if (head === null || head.next === null || head.next.next === null){
    return head;
  }
  
  let pt = head;
  let even = head.next;
  let hop = head.next.next;
  let evenPt = head.next;
  
  while (hop !== null){
    pt.next = hop;
    evenPt.next = hop.next;
    hop = hop.next? hop.next.next : null;
    
    pt = pt.next;
    evenPt = evenPt.next;
  }
  
  pt.next = even;
  
  return head;
};

/*
Palindrome Linked List : Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

Constraints:
The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9
*/

//time O(n) space O(1)
var isPalindrome = function(head) {

  let half = head;
  let double = head;
  let prevHd = null;
  
  while (double !== null && double.next !== null) {
  let remain = head.next;
    double = double.next.next;
    head.next = prevHd;
    prevHd = head;
    head = remain;
  }
  
  if (double !== null && double.next === null) {
    head = head.next;
  }
  
  
  while (head !== null && prevHd !== null) {
    if (head.val !== prevHd.val) {
      return false;
  }
    head = head.next;
    prevHd = prevHd.next;
  }
  
  return true;
    
};

/*
Merge Two Sorted Lists
Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.
*/

var mergeTwoLists = function(list1, list2) {
  if (list1 === null){
    return list2;
  }
  
  if (list2 === null) {
    return list1;
  }
  
  let head = new ListNode(0);
  let pt = head;
  let pt1 = list1;
  let pt2 = list2;
  
  
  while (pt1 !== null && pt2 !== null){
    if (pt1.val < pt2.val) {
      pt.next = pt1;
      pt1 = pt1.next;
    } else {
      pt.next = pt2;
      pt2 = pt2.next;
    }
    pt = pt.next;
  }
  
  if (pt1 === null){
    pt.next = pt2;
  } else if (pt2 === null) {
    pt.next = pt1;
  }
  
  return head.next;
  
};

/*
Add Two Numbers
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/

var addTwoNumbers = function(l1, l2) {
  let sum = new ListNode(0);
  let head = sum;
  let zero = new ListNode(0);
    
  while (l1 !== zero || l2 !== zero){
    sum.val += (l1.val + l2.val);
    let next = new ListNode( Math.floor(sum.val / 10) );
    sum.val = sum.val % 10;
    l1 = l1.next? l1.next : zero;
    l2 = l2.next? l2.next : zero;
    if ((l1 !== zero || l2 !== zero) || next.val){
      sum.next = next;
      sum = sum.next;
    }
  }
  
  return head;
};