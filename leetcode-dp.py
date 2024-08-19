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
            
