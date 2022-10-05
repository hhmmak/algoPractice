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

//second attempt - faster runtime & less memory
var oddEvenList = function(head) {
  
	if (!head || !head.next || !head.next.next) {
		return head;
	}
	let evenHead = head.next;
	let odd = head;
	let even = evenHead;
	while (even.next && even.next.next){
		odd.next = even.next;
		odd = odd.next;
		even.next = odd.next;
		even = even.next;
	}
	if (even.next){
		odd.next = even.next;
    odd = odd.next;
    even.next = null;
	}
	odd.next = evenHead;
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

// recursion - runtime more than first attempt
// var mergeTwoLists = function(list1, list2) {
// 	let root = null;
// 	if (!(list1 || list2)){
// 		return null;
// 	}
// 	if (list1 && (list2 === null || list1.val < list2.val)) {
// 		list1.next = mergeTwoLists(list1.next, list2);
//     return list1;
// 	}
// 		list2.next = mergeTwoLists(list1, list2.next);
//     return list2;
		
// }

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

/*
Flatten a Multilevel Doubly Linked List
You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. 
This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. 
These child lists may have one or more children of their own, and so on, to produce a multilevel data structure as shown in the example below.
Given the head of the first level of the list, flatten the list so that all the nodes appear in a single-level, doubly linked list. 
Let curr be a node with a child list. The nodes in the child list should appear after curr and before curr.next in the flattened list.
Return the head of the flattened list. The nodes in the list must have all of their child pointers set to null.

Constraints:
The number of Nodes will not exceed 1000.
1 <= Node.val <= 105
*/

var flatten = function(head) {
  
  if (!head){
    return head;
  }
  
  const read = (pt) => {
    let next = pt;
    while (next){
      if (pt.child){
        let remain = pt.next;
        pt.next = pt.child;
        pt.child.prev = pt;
        pt.child = null;
        if (remain){
          remain.prev = read(pt.next);
          remain.prev.next = remain;
          next = remain;
        }
      } else {
        next = pt.next;
      }
      if (next){
        pt = next;
      }
    }
    return pt;
  }
  
  let node = head;
  read(node);
  
  return node;


};

/*
Copy List with Random Pointer
A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.
Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its 
corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the 
original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

Constraints:
0 <= n <= 1000
-104 <= Node.val <= 104
Node.random is null or is pointing to some node in the linked list.
*/


var copyRandomList = function(head) {
	if (!head){
    return null;
  }
  
  let pt = head;
	
	while (pt) {
		let copy = new Node(pt.val, pt.next, pt.random);
		pt.next = copy;
		pt = pt.next.next;
	}
  
	let headCopy = head.next;
	pt = headCopy;
	while (pt) {
		if (pt.random) {
			pt.random = pt.random.next;
		}
    pt = pt.next? pt.next.next : null;
	}

	pt = head;
	while (pt.next){
		let copy = pt.next;
		pt.next = pt.next.next;
		pt = copy;
	}

	return headCopy;
};

/*
Rotate List
Given the head of a linked list, rotate the list to the right by k places.
*/

var rotateRight = function(head, k) {
  let pt = head;
	let length = 0;
	while (pt) {
		length ++;
		pt = pt.next;
	}
	
	if ( !(head && (k % length)) || length === 1 ){
		return head;
	}
	
	pt = head;
	for (let i = 1; i < length - (k % length); i++){
		pt = pt.next;
	}
	let newHead = pt.next;
	pt.next = null;
	
	pt = newHead;
	while (pt.next) {
		pt = pt.next;
	}
	pt.next = head;

	return newHead;

};

/*
Sort List
Given the head of a linked list, return the list after sorting it in ascending order.
*/

var sortList = function(head) {
  if (!head || !head.next){
    return head;
  }
  
  let prev = null;
  let slow = head;
  let fast = head;
  
  //split list into halves
  while (fast && fast.next){
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
    
  prev.next = null;
  
  const merge = (first, second) => {
    let headPrev = new ListNode(0); //dummy head node
    let pt = headPrev;
    
    while (first && second){
      if (first.val < second.val) {
        pt.next = first;
        first = first.next;
      } else {
        pt.next = second;
        second = second.next;
      }
      pt = pt.next;
    }
    
    // connect remaining sorted nodes
    if (!first){
      pt.next = second;
    }
    if (!second){
      pt.next = first;
    }
    
    return headPrev.next;
  }

  return merge(sortList(head), sortList(slow));
};