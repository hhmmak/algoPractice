from typing import List


class Solution:

    """ 2678. Number of Senior Citizens """
    def countSeniors(self, details: List[str]) -> int:
        
        seniors = 0
        
        for detail in details:
            age = int(detail[11:13])
            if age > 60:
                seniors += 1

        return seniors
    
    """ 273. Integer to English Words """
    def numberToWords(self, num: int) -> str:

        if num == 0:
            return "Zero"

        below_twenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen","Eighteen", "Nineteen"]
        tens = ["","","Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
        thousands = ["", " Thousand"," Million"," Billion"]

        thousandth = 0
        num_quo = num
        result = ""
        while (num_quo > 0):
            temp_result = ""
            
            # handle last three digit, store remainder
            num_mod = num_quo % 1000
            num_quo = num_quo // 1000
            
            # handle hundredth digit
            hun_mod = num_mod % 100
            hundredth = num_mod // 100

            if hundredth > 0:
                temp_result = below_twenty[hundredth] + " Hundred"
                if hun_mod > 0:
                    temp_result = temp_result + " "

            # handle tenth and unit digit
            if hun_mod > 0 and hun_mod < 20:
                temp_result = temp_result + below_twenty[hun_mod]
            elif hun_mod >= 20:
                ten_mod = hun_mod % 10
                tenth = hun_mod // 10
                temp_result = temp_result + tens[tenth] 
                if ten_mod > 0:
                    temp_result = temp_result + " " + below_twenty[ten_mod]

            # handle thousands if needed
            if len(temp_result) > 0: 
                result = temp_result + thousands[thousandth] + result
                if num_quo > 0:
                    result = " " + result
            thousandth += 1

        return result
    
    """ 592. Fraction Addition and Subtraction """

    def fractionAddition(self, expression: str) -> str:
        expression = expression + "+"
        r_frac = [0,0,1]
        t_frac = [1,0,0]
        frac_ptr = 1
        action = '+'
        for ch in expression:
            if ch.isnumeric():
                t_frac[frac_ptr] = 10 * t_frac[frac_ptr] + int(ch)
            elif ch == '/':
                frac_ptr = 2
            elif frac_ptr == 1:
                t_frac[0] = -1
            else:
                # update numerator
                if action == '+':
                    r_frac[1] = r_frac[1] * t_frac[2] + r_frac[2] * t_frac[1] * t_frac[0]
                else:   #   action == '-'
                    r_frac[1] = r_frac[1] * t_frac[2] - r_frac[2] * t_frac[1] * t_frac[0]
                # update denominator
                r_frac[2] *= t_frac[2]
                # special case: result is 0
                if r_frac[1] == 0:
                    r_frac[2] = 1
                # reduce fraction
                fac = 2
                while fac <= (min(abs(r_frac[1]), r_frac[2]) + 1):
                    while r_frac[1] % fac == 0 and r_frac[2] % fac == 0:
                        r_frac[1] //= fac
                        r_frac[2] //= fac
                    fac += 1
                # resets variables
                action = ch
                t_frac = [1,0,0]
                frac_ptr = 1
        

        return f"{r_frac[1]}/{r_frac[2]}"

    """ 1422. Maximum Score After Splitting a String """

    def maxScore(self, s):
        """
        :type s: str
        :rtype: int
        """

        left = 0
        right = 0
        result = 0

        # count points if no split from the right, i.e. number of zeros
        for ptr in range(len(s)):
            if s[ptr] == '0':
                left += 1
        
        # calculate and store max point when splitting from rightmost digit
        for ptr in range(len(s) - 1, 0, -1):
            if s[ptr] == '1':
                right += 1
            elif s[ptr] == '0':
                left -= 1
            result = max(result, left + right)
        
        return result
