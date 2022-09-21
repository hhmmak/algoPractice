/*
Maximum Depth of Binary Tree
*/

var maxDepth = function(root) {

	const findDepth = (root) => {
		if ( !root ) {
			return 0;
		}
		return Math.max(findDepth(root.left) + 1, findDepth(root.right) + 1);
		
	}
  
  return findDepth(root);
};

/*
Binary Tree Preorder Traversal
*/

// first attempt = iterative
var preorderTraversal = function(root) {
  let result = [];
  let temp = [];
  let node = root;

  while (node){
    result.push(node.val);
    if (node.right) {
      temp.push(node.right);
    }
    if (node.left) {
      node = node.left;
    } else if (temp.length >= 1){
      node = temp[temp.length - 1];
      temp.pop();
    } else {
      node = null;
    } 
  }
  
  return result;
};