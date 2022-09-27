/*
Maximum Depth of Binary Tree
*/

var maxDepth = function (root) {
  const findDepth = (root) => {
    if (!root) {
      return 0;
    }
    return Math.max(findDepth(root.left) + 1,findDepth(root.right) + 1);
  };

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
  };

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
  };
  check(root);
  return result;
};

// third attempt - recursion, same function
var inorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  return [
    ...inorderTraversal(root.left),
    root.val,
    ...inorderTraversal(root.right),
  ];
};

/*
Post-order traversal
*/

// iterative, backwards
var postorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  let result = [];
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    result.unshift(node.val);
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }
  return result;
};

//recursive
var postorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  return [
    ...postorderTraversal(root.left),
    ...postorderTraversal(root.right),
    root.val,
  ];
};

/*
Breadth-First Search, Level Order traversal
*/

var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  let queue = [root];
  let level = -1;
  let result = [];
  while (queue.length) {
    let neighbors = queue.length;
    result.push([]);
    level++;

    for (let i = 0; i < neighbors; i++) {
      let node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      result[level].push(node.val);
    }
  }

  return result;
};

/*
Symmetric Tree
*/

var isSymmetric = function (root) {
  const check = (rootL,rootR) => {
    if (!rootL || !rootR) {
      return rootL === rootR;
    }
    if (rootL.val !== rootR.val) {
      return false;
    }
    return check(rootL.left,rootR.right) && check(rootL.right,rootR.left);
  };

  return check(root.left,root.right);
};

/*
Path Sum
*/

var hasPathSum = function (root,targetSum) {
  if (!root) {
    return false;
  }

  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  const add = (node,sum) => {
    if (!node.left && !node.right) {
      return sum + node.val === targetSum;
    }
    if (!node.right) {
      return add(node.left,sum + node.val);
    }
    if (!node.left) {
      return add(node.right,sum + node.val);
    }

    return add(node.left,sum + node.val) || add(node.right,sum + node.val);
  };

  return add(root,0);
};

/*
Construct Binary Tree from Inorder and Postorder Traversal
*/

var buildTree = function (inorder,postorder) {
  let mapInorder = {};
  inorder.forEach((val,i) => (mapInorder[val] = i));
  const build = (low,high) => {
    if (low > high) {
      return null;
    }
    let node = new TreeNode(postorder.pop());
    let rootIndex = mapInorder[node.val];
    node.right = build(rootIndex + 1,high);
    node.left = build(low,rootIndex - 1);
    return node;
  };
  return build(0,inorder.length - 1);
};

/*
Construct Binary Tree from Preorder and Inorder Traversal
*/

var buildTree = function (preorder,inorder) {
  let mapInorder = {};
  inorder.forEach((val,i) => (mapInorder[val] = i));

  const build = (start,end) => {
    if (start > end) {
      return null;
    }
    let node = new TreeNode(preorder.shift());
    let nodeIndex = mapInorder[node.val];
    node.left = build(start,nodeIndex - 1);
    node.right = build(nodeIndex + 1,end);
    return node;
  };
  return build(0,preorder.length - 1);
};

/*
Populating Next Right Pointers in Each Node
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. 
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
Initially, all next pointers are set to NULL.
You may only use constant extra space.
The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

Constraints:
The number of nodes in the tree is in the range [0, 212 - 1].
-1000 <= Node.val <= 1000
*/

var connect = function (root) {
  let prevHead = root;

  while (prevHead && prevHead.left) {
    let prev = prevHead;
    let node = prev.left;
    while (!(prev.next === null && node === prev.right)) {
      if (node === prev.right) {
        prev = prev.next;
        node.next = prev.left;
      } else {
        node.next = prev.right;
      }
      node = node.next;
    }
    prevHead = prevHead.left;
  }
  return root;
};

/*
Lowest Common Ancestor of a Binary Tree
*/

var lowestCommonAncestor = function (root,p,q) {
  if (root === null) {
    return false;
  }
  let left = lowestCommonAncestor(root.left,p,q);
  let right = lowestCommonAncestor(root.right,p,q);

  if (left && right) {
    return root;
  }

  if (root !== p && root !== q) {
    return left || right;
  }

  if (left || right) {
    return root;
  }

  return true;
};

/*
Serialize and Deserialize Binary Tree
*/

var serialize = function (root) {
  if (!root) {
    return [];
  }

  let result = [];
  let queue = [root];
  let nullCount = 0;
  let levelCount = queue.length;

  while (nullCount !== levelCount) {
    nullCount = 0;
    for (let i = 0; i < levelCount; i++) {
      let node = queue.shift();
      if (node) {
        queue.push(node.left);
        if (!node.left) {
          nullCount++;
        }
        queue.push(node.right);
        if (!node.right) {
          nullCount++;
        }
      }
      result.push(node && node.val);
    }
    levelCount = queue.length;
  }

  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;

};

var deserialize = function (data) {
  if (!data.length) {
    return null;
  }


  let map = {};

  let root = new TreeNode(data[0]);
  map[0] = root;

  let node = 0;
  let child = 1;

  while (child < data.length) {
    if (map[node]) {
      if (data[child] !== null) {
        map[node].left = new TreeNode(data[child]);
        map[child] = map[node].left
      }
      child++;
      if (child < data.length) {
        if (data[child] !== null) {
          map[node].right = new TreeNode(data[child]);
          map[child] = map[node].right
        }
        child++;
      }
    }
    node++;
  }
  return root;


};
