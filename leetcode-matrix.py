from typing import List


class Solution:

    """ 1380. Lucky Numbers in a Matrix : lucky number ==> max in its col and min in its row, all number are distinct """

    def luckyNumbers (self, matrix: List[List[int]]) -> List[int]:
        m, n = len(matrix), len(matrix[0])
        min_row = set()
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
    
    """ 885. Spiral Matrix III : return array for coordinates going clockwise spiral in matrix starting from specified cell """
    
    def spiralMatrixIII(self, rows: int, cols: int, rStart: int, cStart: int) -> List[List[int]]:

        remaining = rows * cols - 1
        direction = 4   # right -> down -> left -> up

        r = rStart
        c = cStart
        result = [[r, c]]
        move = count = 1
        reset = 1   
        # total move in same direction is same for two rounds
        # + 1 to move when reset = 0
        
        while (remaining > 0):
            if direction == 4:  #right
                c += 1
            if direction == 3:  #down
                r += 1
            if direction == 2:  #left
                c -= 1
            if direction == 1:  #up
                r -= 1

            # add coordinates if cell is in matrix
            if (c >= 0 and c < cols and r >= 0 and r < rows):
                result.append([r, c])
                remaining -= 1

            count -= 1
            if count == 0:
                direction = direction - 1 if direction > 1 else 4
                count = move
                reset -= 1
                if reset == 0:
                    move += 1
                    reset = 2

        return result
