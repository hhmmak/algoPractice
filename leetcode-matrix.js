/**
 * 2658. Maximum Number of Fish in a Grid
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function (grid) {
  let visited = {}
  let maxFish = 0
  let r = grid.length
  let c = grid[0].length

  let traverseCell = (y,x) => {

    // end traverse if
    // 1. reached end of grid
    // 2. grid is land grid
    // 3. water cell is visited
    if (y < 0 || x < 0 || y > r - 1 || x > c - 1
      || grid[y][x] === 0 || visited[`${y}_${x}`]) {
      return 0
    }

    visited[`${y}_${x}`] = true

    // find all fish caught in connected water cells
    let caughtFish = traverseCell(y,x + 1) + traverseCell(y,x - 1)
      + traverseCell(y + 1,x) + traverseCell(y - 1,x)

    return caughtFish + grid[y][x]
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      maxFish = Math.max(traverseCell(i,j),maxFish)
    }
  }

  return maxFish
};

/**
 * 827. Making A Large Island
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function (grid) {
  let visited = {}
  let sizeMap = { 0: 0,10: 0 }
  let label = 10
  let n = grid.length
  let maxIsland = 0

  let getSide = (y,x) => {
    if (y < 0 || y >= n || x < 0 || x >= n
      || grid[y][x] === 0) {
      return 0
    }
    return grid[y][x]
  }

  let traverseIsland = (y,x) => {
    if (y < 0 || y >= n || x < 0 || x >= n
      || grid[y][x] == 0 || visited[`${y}_${x}`]) {
      return 0
    }
    visited[`${y}_${x}`] = true

    let size = traverseIsland(y + 1,x) + traverseIsland(y - 1,x)
      + traverseIsland(y,x + 1) + traverseIsland(y,x - 1)
    grid[y][x] = label
    return size + 1
  }

  let findMaxFlip = (y,x) => {
    if (y < 0 || y >= n || x < 0 || x >= n
      || grid[y][x]) {
      return 0
    }
    let size = 1
    let labelMap = {}
    let side1 = getSide(y + 1,x)
    let side2 = getSide(y - 1,x)
    let side3 = getSide(y,x + 1)
    let side4 = getSide(y,x - 1)
    if (!labelMap[side1]) {
      labelMap[side1] = true
      size += sizeMap[side1]
    }
    if (!labelMap[side2]) {
      labelMap[side2] = true
      size += sizeMap[side2]
    }
    if (!labelMap[side3]) {
      labelMap[side3] = true
      size += sizeMap[side3]
    }
    if (!labelMap[side4]) {
      labelMap[side4] = true
      size += sizeMap[side4]
    }

    return size
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let size = traverseIsland(i,j)
      if (size !== 0) {
        sizeMap[label] = size
        label += 10
      }
    }
  }

  if (label === 10) {
    return 1
  }

  if (label === 20) {
    return Math.min(sizeMap[10] + 1,n * n)
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let size = findMaxFlip(i,j)
      maxIsland = Math.max(maxIsland,size)
    }
  }

  return maxIsland
};

/**
 * 73. Set Matrix Zeroes
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  let mMap = new Array(m).fill(false)
  let nMap = new Array(n).fill(false)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        mMap[i] = true
        nMap[j] = true
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mMap[i] || nMap[j]) {
        matrix[i][j] = 0
      }
    }
  }
};
