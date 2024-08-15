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
    
    """ 1653. Minimum Deletions to Make String Balanced """

    def minimumDeletions(self, s: str) -> int:

        deletion = 0
        b_cnt = 0
        
        # get the min deletion of each substring, i.e. s[:ch_idx]
        for ch in s:
            if ch == 'a':
                # i.e. last character is an 'a', so to balance:
                # either delete the newly included 'a' (previous needed deletion + 1 new deletion)
                # or remove all the 'b's in the string (b_cnt)
                # take the min between the two
                deletion = min(deletion + 1, b_cnt)
            else:   # elif ch == 'b':
                # do not need to delete anything since 'b' is at the end of the string, i.e. deletion remains unchanged
                # keep track of all 'b's in the string up to this point
                b_cnt += 1

        return deletion

    """ 2134. Minimum Swaps to Group All 1's Together """

    def minSwaps(self, nums: List[int]) -> int:

        nums_len = len(nums)
        total_ones = 0

        for num in nums:
            total_ones += num

        if total_ones <= 1 or total_ones >= nums_len - 1:
            return 0
        
        count_ones = 0
        for i in range(total_ones):
            count_ones += nums[i]

        max_count_ones = count_ones

        # sliding window
        for i in range(total_ones, nums_len + total_ones):
            count_ones += nums[i % nums_len]
            count_ones -= nums[(i - total_ones + nums_len) % nums_len]
            max_count_ones = max(max_count_ones, count_ones)
        
        return total_ones - max_count_ones
    
    """ 2053. Kth Distinct String in an Array """

    def kthDistinct(self, arr: List[str], k: int) -> str:
        arr_map = {}
        for string in arr:
            arr_map[string] = arr_map.get(string, 0) + 1
        k_counter = k
        for string in arr:
            if arr_map[string] == 1:
                k_counter -= 1
                if k_counter == 0:
                    return string
        
        return ""
        
    """ 3016. Minimum Number of Pushes to Type Word II """
    
    def minimumPushes(self, word: str) -> int:

        # total keys = 8 (2 to 9)
        # minimum number => 
        #   evenly divide the existing letters in the word to the 8 keys
        #   most frequest character with less pushes

        letters = [0] * 26

        for character in word:
            letters[ord(character) - ord('a')] += 1
        
        letters.sort(reverse=True)

        total_pushes = 0
        key_pushes = 1
        count = 8
        idx = 0

        while idx < 26 and letters[idx] != 0 :
            total_pushes += letters[idx] * key_pushes
            count -= 1
            if count == 0:
                key_pushes += 1
                count = 8
            idx += 1

        return total_pushes

    """ 719. Find K-th Smallest Pair Distance """

    def smallestDistancePair(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """

        def count_pairs(distance_limit):
            count = 0
            left = 0
            for right in range(len(nums)):
                while nums[right] - nums[left] > distance_limit:
                    left += 1
                count += right - left
            
            return count

        nums.sort()
        min_distance, max_distance = 0, nums[-1] - nums[0]

        while (min_distance < max_distance):
            mid_distance = (min_distance + max_distance) // 2
            total_pairs = count_pairs(mid_distance)
            if total_pairs < k:
                min_distance = mid_distance + 1
            else:
                max_distance = mid_distance

        return min_distance
    
    """ 860. Lemonade Change """

    def lemonadeChange(self, bills):
        """
        :type bills: List[int]
        :rtype: bool
        """
        cashier = {
            5: 0,
            10: 0,
            20: 0
        }

        for bill in bills:
            change = bill - 5
            if change % 10 == 5:
                if cashier[5] == 0:
                    return False
                else:
                    cashier[5] -= 1
                    change -= 5
            if change > 0:
                if cashier[10] == 0:
                    if cashier[5] < 2:
                        return False
                    else:
                        cashier[5] -= 2
                else:
                    cashier[10] -= 1
            cashier[bill] += 1
        
        return True
