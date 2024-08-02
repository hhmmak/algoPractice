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
    