/**
 * 1161. Maximum Level Sum of a Binary Tree
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxLevelSum = function(root) {

    let sumArr = [0]

    let findSum = (node, level) => {
        if (node) {
            if (sumArr.length === level){
                sumArr.push(node.val)
            } else {
                sumArr[level] += node.val
            }  
            findSum(node.left, level + 1);
            findSum(node.right, level + 1);
        }
    }

    findSum(root, 1);

    let maxSum = root.val
    let maxLevel = 1

    for (let i = 2; i < sumArr.length; i++){
        if (sumArr[i] > maxSum){
            maxSum = sumArr[i];
            maxLevel = i
        }
    }
    return maxLevel
};


/**
 * 1339. Maximum Product of Splitted Binary Tree
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxProduct = function(root) {
    let result = 0
    let totalSum = 0

    let findSums = (root) => {
        if (!root){
            return 0
        }
        let sum = root.val
        sum += findSums(root.left)
        sum += findSums(root.right)
        if (totalSum){
            result = Math.max(result, (totalSum - sum) * sum)
        }
        return sum
    }

    totalSum = findSums(root)
    findSums(root)
    return result % (10**9 + 7)
};

/**
 * 1458. Max Dot Product of Two Subsequences
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function(nums1, nums2) {

    let rows = nums1.length
    let columns = nums2.length

    let dotProds = new Array(columns + 1)
    for (let i = 0; i <= columns; i++){
        dotProds[i] = new Array(rows + 1).fill(-Infinity)
    }

    for (let i = 1; i <= columns; i++){
        for (let j = 1; j <= rows; j++){
            dotProds[i][j] = Math.max(
                nums2[i-1] * nums1[j-1] + dotProds[i-1][j-1],
                nums2[i-1] * nums1[j-1],
                dotProds[i-1][j],
                dotProds[i][j-1]
            )
        }
    }
    console.log(dotProds)
    return dotProds[columns][rows]
};

/**
 * 865. Smallest Subtree with all the Deepest Nodes
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function(root) {
    let maxDepth = 0
    let result = null
    let dfs = (node, depth) => {
        maxDepth = Math.max(maxDepth,depth)
        if (!node){
            return depth
        }
        let leftDepth = dfs(node.left, depth + 1)
        let rightDepth = dfs(node.right, depth + 1)
        if (leftDepth === rightDepth && leftDepth === maxDepth){
            result = node
        }
        return Math.max(leftDepth, rightDepth)
    }
    dfs(root, 0)
    return result;
};
