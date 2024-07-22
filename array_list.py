import math
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
    
    """ 4. Median of Two Sorted Arrays """
    
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        len1 = len(nums1)
        len2 = len(nums2)
        total_len = len1 + len2
        # stores median
        median = nums1[0] if nums1 else nums2[0]
        # count for reaching the second to median number or the second number closest to median
        median_countdown = math.floor((total_len + 1) / 2)  

        ptr1 = 0
        ptr2 = 0

        while median_countdown > 0:
            if ptr2 >= len2 or (ptr1 < len1 and nums1[ptr1] < nums2[ptr2]) :
                median = nums1[ptr1]
                ptr1 += 1
            else:
                median = nums2[ptr2]
                ptr2 += 1

            median_countdown -= 1
        
        # case when median is an average of two numbers
        if (total_len - 1) % 2:
            if ptr1 >= len1:
                return (median + nums2[ptr2]) / 2
            elif ptr2 >= len2:
                return (median + nums1[ptr1]) / 2
            else:
                temp = min(nums1[ptr1], nums2[ptr2])
                return (median + temp) / 2
        
        else:
            return median
