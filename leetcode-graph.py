from typing import List


class Solution:

    """ 1514. Path with Maximum Probability """

    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        
        # set up adjacency list
        neighbors = [[] for _ in range(n)]
        for idx, edge in enumerate(edges):
            neighbors[edge[0]].append([edge[1], succProb[idx]])
            neighbors[edge[1]].append([edge[0], succProb[idx]])

        # array to store max probability of start - node
        max_p = [0.0] * n
        max_p[start_node] = 1.0

        # traverse through graph
        queue = [start_node]

        while len(queue) > 0:
            curr = queue.pop(0)
            for neighbor in neighbors[curr]:
                temp_p = max_p[curr] * neighbor[1]
                # update max probability
                if temp_p > max_p[neighbor[0]]:
                    max_p[neighbor[0]] = temp_p
                    queue.append(neighbor[0])

        return max_p[end_node]
