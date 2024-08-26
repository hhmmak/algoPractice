from typing import List


# Definition for a nary-tree Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val: int = val
        self.children: List['Node'] = children


class Solution:

    """ 590. N-ary Tree Postorder Traversal """

    def postorder(self, root: 'Node') -> List[int]:
        if root == None:
            return []
        
        # recursive solution
        
        # if root.children == None:
        #     return [root.val]

        # result = []
        # for child in root.children:
        #     result = result + self.postorder(child)
        
        # result.append(root.val)

        # return result

        # iterative solution
        
        result = []
        stack = [root]

        while len(stack) > 0:
            cur = stack.pop()
            result.append(cur.val)
            for child in cur.children:
                stack.append(child)

        result.reverse()
        return result
