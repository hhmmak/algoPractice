class Solution(object):

    """ 650. 2 Keys Keyboard """

    def minSteps(self, n):
        """
        :type n: int
        :rtype: int
        """
        
        steps = 0
        quotient = n
        divisor = 2
        while divisor < n // 2:
            while quotient % divisor == 0:
                steps += divisor
                quotient /= divisor
            divisor += 1
        
        if quotient != 1:
            steps += quotient
        
        return steps
    
    """ 264. Ugly Number II """

    def nthUglyNumber(self, n):
        """
        :type n: int
        :rtype: int
        """
        
        num = 1
        ugly = [1] * n
        ptr = [0, 0, 0]
        mul = [0, 0, 0]
        prime = [2, 3, 5]

        for num in range(1, n):
            minimum = float('inf')
            for i in range(3):
                mul[i] = prime[i] * ugly[ptr[i]]
                if mul[i] < minimum:
                    minimum = mul[i]
            
            ugly[num] = minimum
            for i in range(3):
                if mul[i] == minimum:
                    ptr[i] += 1

        return ugly[n - 1]
            
    """ 1140. Stone Game II """

    def stoneGameII(self, piles):
        """
        :type piles: List[int]
        :rtype: int
        """
        n = len(piles)

        if n == 0:
            return 0
        
        sums = [0] * n
        sums[n - 1] = piles[n - 1]
        hash_map = [[0] * n for _ in range(n)]

        # memo for total stones taken from end to beginning
        for i in range(n - 2, -1, -1):
            sums[i] = sums[i + 1] + piles[i]
        
        # count maximum total stones alice can get
        def count_total(curr_pile, m):
            
            if (curr_pile == n):
                return 0

            if (n - curr_pile <= 2 * m):
                return sums[curr_pile]

            if hash_map[curr_pile][m] == 0:
            
                # find minimum being taken for each possible Bob turn (upcoming 2M piles)
                min_taken = float('inf')
                for i in range(1, 2 * m + 1):
                    total = count_total(curr_pile + i, max(m, i))
                    min_taken = min(min_taken, total)

                # alice taken = total stones possible - minimal stones taken by bob
                hash_map[curr_pile][m] = sums[curr_pile] - min_taken

            return hash_map[curr_pile][m]

        return count_total(0, 1)
