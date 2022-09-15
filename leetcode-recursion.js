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