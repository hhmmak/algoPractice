# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


"""
2196. Create Binary Tree From Descriptions

"""

class Solution(object):
    def createBinaryTree(self, descriptions):
        """
        :type descriptions: List[List[int]]
        :rtype: Optional[TreeNode]
        """
        
        root = None # return target

        tree_map = {}
        children_set = set()

        # set up map of entire binary tree, bookmark all children nodes
        for parent, child, isLeft in descriptions:

            children_set.add(child)

            # create child node of needed
            if not child in tree_map:
                tree_map[child] = TreeNode(child)
            
            # create parent node if needed and connect with child node 
            if not parent in tree_map:
                if isLeft:
                    tree_map[parent] = TreeNode(parent, tree_map[child], None)
                else:
                    tree_map[parent] = TreeNode(parent, None, tree_map[child]) 
            else:
                if isLeft:
                    tree_map[parent].left = tree_map[child]
                else:
                    tree_map[parent].right = tree_map[child]
            
        # check root node
        for parent in tree_map:
            if not parent in children_set:
                root = tree_map[parent]
                break
        
        return root
