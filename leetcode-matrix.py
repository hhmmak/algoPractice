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

    """ 840. Magic Squares In Grid """

    def numMagicSquaresInside(self, grid: List[List[int]]) -> int:

        row = len(grid)
        col = len(grid[0])

        # check if any 3*3 grid exist
        if row < 3 or col < 3:
            return 0

        # helper function to check if subgrid is a magic square
        def isValid (r, c):
            # 1. check if distict numbers from 1 - 9
            not_distinct = [False] * 10

            for x in range(3):
                for y in range(3):
                    if  grid[r-x][c-y] == 0 or grid[r-x][c-y] > 9 or not_distinct[grid[r-x][c-y]]:
                        return False
                    not_distinct[grid[r-x][c-y]] = True


            # check if row sum equal
            row_sum = grid[r][c-2] + grid[r][c-1] + grid[r][c]
            for x in range(1,3):
                if row_sum != grid[r-x][c-2] + grid[r-x][c-1] + grid[r-x][c]:
                    return False
            
            # check if col sum equal
            col_sum = grid[r-2][c] + grid[r-1][c] + grid[r][c]
            for y in range(1,3):
                if col_sum != grid[r-2][c-y] + grid[r-1][c-y] + grid[r][c-y]:
                    return False 
            
            # check if diagonal sum equal
            if (grid[r][c] + grid[r-2][c-2]) != (grid[r][c-2] + grid[r-2][c]):
                return False

            # all conditions checked out
            return True


        result = 0
        
        for r in range(2, row):
            for c in range(2, col):
                if isValid(r, c):
                    result += 1

        return result

    """ 1905. Count Sub Islands: island in grid2 is a subisland when it is part of an island in grid1 """

    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        rows = len(grid2)
        cols = len(grid2[0])
        visited = [[False] * cols for _ in range(rows)]

        result = 0

        def findSubIsland (i, j):
            # stop finding if out of bound or visited that part of the island already
            if i < 0 or i >= rows or j < 0 or j >= cols or visited[i][j] == True:
                return True
            
            visited[i][j] = True
            
            # stop finding if reached water
            if grid2[i][j] == 0:
                return True

            # check if it is a sub-island
            isSubIsland = True

            if grid1[i][j] == 0:
                isSubIsland = False
            
            # check around the island to see if it is still an island and whether it is a subisland
            isSubIsland = findSubIsland(i + 1, j) and isSubIsland
            isSubIsland = findSubIsland(i - 1, j) and isSubIsland
            isSubIsland = findSubIsland(i, j + 1) and isSubIsland
            isSubIsland = findSubIsland(i, j - 1) and isSubIsland

            return isSubIsland



        for row in range(rows):
            for col in range(cols):
                if not visited[row][col]:
                    if grid2[row][col] == 1:
                        if findSubIsland(row, col):
                            result += 1

        return result
        