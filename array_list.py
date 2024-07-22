from typing import List


class Solution:

    """
    2418. Sort the People 
    given two arrays of distinct height and corresponding names, return array of names with descending order of height
    """

    def sortPeople_dict(self, names: List[str], heights: List[int]) -> List[str]:

        map = {heights[i]: names[i] for i in range(len(heights))}
        heights.sort(reverse=True)
        names_sorted = []
        for height in heights:
            names_sorted.append(map[height])
        
        return names_sorted
    
    def sortPeople_tuple(self, names: List[str], heights: List[int]) -> List[str]:

        people = [(heights[i], names[i]) for i in range(len(heights))]
        print(people)
        people.sort(reverse=True, key=lambda person: person[0])
        
        return [person[1] for person in people]