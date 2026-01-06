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
