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
