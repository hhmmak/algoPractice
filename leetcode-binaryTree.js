/*
Maximum Depth of Binary Tree
*/

var maxDepth = function (root) {

  const findDepth = (root) => {
    if (!root) {
      return 0;
    }
    return Math.max(findDepth(root.left) + 1,findDepth(root.right) + 1);

  }

  return findDepth(root);
};

/*
Binary Tree Preorder Traversal
*/

// first attempt = iterative
var preorderTraversal = function (root) {
  let result = [];
  let temp = [null];
  let node = root;

  while (node) {
    result.push(node.val);
    if (node.right) {
      temp.push(node.right);
    }
    node = node.left || temp.pop();
  }

  return result;
};

//second attempt = recursive
var preorderTraversal = function (root) {
  let result = [];

  const list = (node) => {
    if (!node) {
      return;
    }
    result.push(node.val);
    list(node.left);
    list(node.right);
  }

  list(root);
  return result;
};

/*
Binary Tree Inorder Traversal
*/

//first attempt - iterative
var inorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  let result = [];
  let stack = [];
  let node = root;

  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    result.push(node.val);
    node = node.right;
  }

  return result;
};

// second attempt - recursion
var inorderTraversal = function (root) {

  let result = [];
  const check = (node) => {
    if (!node) {
      return;
    }
    check(node.left);
    result.push(node.val);
    check(node.right);
  }
  check(root);
  return result;
};

// third attempt - recursion, same function
var inorderTraversal = function(root) {

  if (!root) {
		return [];
	}

	return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];

};