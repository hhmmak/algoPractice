/*
Search in a Binary Search Tree
*/

var searchBST = function(root, val) {
  if (root === null){
    return null;
	}
	if (root.val === val){
		return root;
	}
  if (root.val < val){
    return searchBST(root.right, val);
  }
  //if root.val >= val
	return searchBST(root.left, val);
};

/*
Fibonacci Number
Constraints: 0 <= n <= 30

Climbing Stairs
You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Constraints: 1 <= n <= 45
*/

//map + recursion(memoization); time 2nd space 2nd
var fib = function(n) {
  let map = {};

	map[0] = 0;
	map[1] = 1;
	
	const fibNum = (num) => {
		if (map[num] === undefined) {
			map[num] = fibNum(num - 1) + fibNum(num - 2);
		}
		return map[num];
	};

	return fibNum(n);
	
};


//recursion - time 3rd space 3rd
var fib = function(n) {
	if (n === 0){
    return 0;
  }
  if (n === 1){
    return 1;
  }


	return fib(n - 1) + fib(n - 2);
	
};

//array - time 1st space 1st
var fib = function(n) {
  let arr = new Array(n);
  arr[0] = 0;
  arr[1] = 1;
  for (let i = 2; i <= n; i ++){
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  
  return arr[n];
};

/*
pow(x,n)
Constraints:
-100.0 < x < 100.0
-231 <= n <= 231-1, integer
-104 <= xn <= 104
*/

var myPow = function(x, n) {
  if (n === 0){
    return 1;
  }
  if (x === 1){
      return 1;
  }
  let result  = x;
  let mul = x;
  let i = 2;
  while (i <= Math.abs(n)){
    result *= mul;
      mul = result;
        if (i * 2 <= Math.abs(n)){
          i *= 2;
        } else {
          mul = x;
          i ++;
      }
  }
    
    return n > 0 ? result : (1 / result);
  };


/*
K-th Symbol in Grammar
We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace 
each occurrence of 0 with 01, and each occurrence of 1 with 10.
For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.

Constraints:
1 <= n <= 30
1 <= k <= 2n - 1
*/

//binary tree attempt
//right branch (even number k) must be opposite to root ( k / 2 of n - 1), left branch (odd number of k) must be same of root
//
var kthGrammar = function(n, k) {
  if (n === 1){
    return false;
  }
  if (k % 2) {
    return kthGrammar(n - 1, Math.ceil(k / 2));
  } else {
    return !kthGrammar(n - 1, Math.ceil(k / 2));
  }
};