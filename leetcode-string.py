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