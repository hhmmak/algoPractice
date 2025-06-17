const sumPossible = (amount, numbers, map) => {
  if (amount === 0){
    return true;
  }

  if (amount < 0){
    return false;
  }

  if (map[amount]){
    return true
  }

  for (let num of numbers){
    let diff = amount - num;
    if (sumPossible(diff, numbers, map)) {
      map[diff] = true
      return true;
    }
  }

  return false;
}

const minChange = (amount, numbers, map) => {
  if (amount === 0){
    return 0;
  }

  if (amount < 0){
    return Infinity
  }

  let count = Infinity;
  for (let num of numbers){
    let remain = amount - num;
    let tempCount = minChange(remain, numbers, map)
    count = Math.min(count, tempCount) + 1
  }

  return count;
}
