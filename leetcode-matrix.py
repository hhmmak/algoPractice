from typing import List


class Solution:

    """ 1380. Lucky Numbers in a Matrix : lucky number ==> max in its col and min in its row, all number are distinct """

    def luckyNumbers (self, matrix: List[List[int]]) -> List[int]:
        m, n = len(matrix), len(matrix[0])
        min_row = set()
        max_col = set()
        lucky_num = []

        # store the min number in each row in a set
        # since numbers are distinct, storing of corresponding row number is not needed
        for row in range(m):
            min_num = float('inf')
            for idx in range(n):
                min_num = min(min_num, matrix[row][idx])
            min_row.add(min_num)

        # run again to find max number in each col and check if it is a min num in each row
        for col in range(n):
            max_num = float('-inf')
            for idx in range(m):
                max_num = max(max_num, matrix[idx][col])
            # if max of the col exist in min_row, it is a lucky number
            if max_num in min_row:
                lucky_num.append(max_num)

        return lucky_num