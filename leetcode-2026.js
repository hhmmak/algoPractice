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
