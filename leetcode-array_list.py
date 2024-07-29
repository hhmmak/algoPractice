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
    
    """ Merge Sort """

    def sortArray(self, nums: List[int]) -> List[int]:

        def merge_sort(nums: List[int]) -> List[int]:
            # base case
            if len(nums) == 1:
                return nums
            
            # divide arr to two parts and recursively sort the halved array
            mid = math.floor(len(nums) / 2)
            left_sorted = merge_sort(nums[:mid])
            right_sorted = merge_sort(nums[mid:])

            # sort and merge the two sorted halved array
            sorted_arr = []
            left_ptr, right_ptr = 0, 0
            while (left_ptr < len(left_sorted) and right_ptr < len(right_sorted)):
                if left_sorted[left_ptr] < right_sorted[right_ptr]:
                    sorted_arr.append(left_sorted[left_ptr])
                    left_ptr += 1
                else:
                    sorted_arr.append(right_sorted[right_ptr])
                    right_ptr += 1
            if left_ptr < len(left_sorted):
                sorted_arr = sorted_arr + left_sorted[left_ptr:]
            elif right_ptr < len(right_sorted):
                sorted_arr = sorted_arr + right_sorted[right_ptr:]
            
            return sorted_arr
        
        return merge_sort(nums)
    
    """ 75. Sort Colors """

    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        map = {
            0: 0,
            1: 0,
            2: 0
        }

        for num in nums:
                map[num] += 1
        
        color = 0
        for idx in range(len(nums)):
            while map[color] == 0:
                color += 1
            nums[idx] = color
            map[color] -= 1

    """ 1395. Count Number of Teams """
    def numTeams(self, rating: List[int]) -> int:
        length = len(rating)
        result = 0

        # set middle soldier (j) as ptr
        # valid team definition:
        #   any left soldier (i) with lower rating with any right soldier (k) with higher rating; or
        #   any left solider (i) with higher rating with any right soldier (k) with lower rating

        for j in range(1, length):
            left_lower = left_higher = 0
            right_higher = right_lower = 0

            # separate left soldiers with higher/lower rating
            for i in range(j):
                if rating[j] > rating[i]:
                    left_lower += 1
                else: # elif rating[j] < rating[i]:
                    left_higher += 1
            
            # separate right soldiers with higher/lower rating
            for k in range(j + 1, length):
                if rating[j] > rating [k]:
                    right_lower += 1
                else: # elif rating[j] < rating[k]:
                    right_higher += 1
            
            
            # multiplication to get all combinations of valid teams
            result += left_lower * right_higher + left_higher * right_lower
        
        return result
