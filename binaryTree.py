# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution(object):

    """
    2196. Create Binary Tree From Descriptions
    """

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


    """ 
    Return array/list of values of node in Shortest Route From a Binary Tree Node to another
    """

    def getDirections(self, root, startValue, destValue):
        """
        :type root: Optional[TreeNode]
        :type startValue: int
        :type destValue: int
        :rtype: str
        """

        def dfs(node, val):
            if node is None:
                return None
            
            # found target value
            if node.val == val:
                return [node.val]
            
            # continue dfs
            left = dfs(node.left, val)
            right = dfs(node.right, val)

            route = left if left else right
            if route:
                route.append(node.val)
                print(route)
            
            return route
        
        root_to_dest = dfs(root, destValue)
        root_to_start = dfs(root, startValue)

        start_idx = len(root_to_start) - 1
        parent_val = root.val
        while len(root_to_dest) > 0 and len(root_to_start) > 0 and root_to_dest[-1] == root_to_start[-1]:
            root_to_dest.pop()
            parent_val = root_to_start.pop()

        return root_to_start + [parent_val] + root_to_dest[::-1]

"""
2096. Step-By-Step Directions From a Binary Tree Node to Another
"""


def getDirections(self, root, startValue, destValue):
        """
        :type root: Optional[TreeNode]
        :type startValue: int
        :type destValue: int
        :rtype: str
        """

        # get direction from root to targetValue
        def dfs(node, val):
            if node is None:
                return "" 
            if node.val == val:
                return "E"
            
            # continue dfs
            left = dfs(node.left, val)
            if left:
                return "L" + left

            right = dfs(node.right, val)            
            if right:
                return "R" + right
            
            # return case for if target is root
            return ""
        
        root_to_start = dfs(root, startValue)[:-1]
        
        root_to_dest = dfs(root, destValue)[:-1]

        # find duplicate routes
        idx = 0
        while idx < len(root_to_start) and idx < len(root_to_dest) \
                and root_to_dest[idx] == root_to_start[idx]:
            print(idx)
            idx += 1
        
        # create direction from startValue to root
        start_to_root = "U" * (len(root_to_start) - idx )

        # combine directions
        return start_to_root + root_to_dest[idx:]