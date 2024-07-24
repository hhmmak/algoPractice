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


    """ 1636. Sort Array by Increasing Frequency """

    def frequencySort(self, nums: List[int]) -> List[int]:
        # counter for frequency
        map = {}

        for num in nums:
            if num not in map:
                # use counter with 1000 increment to include the number itself such that if same frequency is compared, the number itself is compared in decending order
                map[num] = 1000 + (100 - num)
            else:
                map[num] += 1000
        
        nums.sort(key=lambda num: map[num])

        return nums
    

    """ 2206. Divide Array Into Equal Pairs """

    def divideArray(self, nums: List[int]) -> bool:

        nums.sort()
        ptr = 0     # stores the current number being counted
        is_odd_count = True
        for num in nums:
            if ptr != num:
                ptr = num
                # check if the counter of previous number is odd, i.e. cannot form pairs
                if is_odd_count is False:
                    return False
                is_odd_count = False
            else:
                is_odd_count = not is_odd_count

        return True
    
    """ 2191. Sort the Jumbled Numbers """

    def sortJumbled(self, mapping: List[int], nums: List[int]) -> List[int]:
        mapped_nums = []
        sorted_nums = []
        map = {}

        # map each number in nums
        for idx in range(len(nums)):
            num = nums[idx]
            digit_cnt = 0
            new_num = 0

            if num == 0:
                new_num = mapping[0]
            else:
                while num != 0:

                    # replace digits with mapped value
                    digit = num % 10
                    new_num += mapping[digit] * (10 ** digit_cnt)

                    # loop condition changes
                    digit_cnt += 1
                    num = math.floor(num / 10)

            mapped_nums.append(new_num)
            if new_num not in map:
                map[new_num] = [idx]
            else:
                map[new_num].append(idx)
        
        mapped_nums.sort()

        # create new list based on sorted num by mapping value
        for mapped_num in mapped_nums:
            mapped_idx = map[mapped_num].pop(0)
            sorted_nums.append(nums[mapped_idx])
            
        return sorted_nums
