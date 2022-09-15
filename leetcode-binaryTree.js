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