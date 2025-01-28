/**
 * 2658. Maximum Number of Fish in a Grid
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function(grid) {
  let visited = {}
  let maxFish = 0
  let r = grid.length
  let c = grid[0].length
  
  let traverseCell = (y, x) => {

      // end traverse if
      // 1. reached end of grid
      // 2. grid is land grid
      // 3. water cell is visited
      if (y < 0 || x < 0 || y > r - 1 || x > c - 1
          || grid[y][x] === 0 || visited[`${y}_${x}`]){
          return 0
      }

      visited[`${y}_${x}`] = true

      // find all fish caught in connected water cells
      let caughtFish = traverseCell(y, x + 1) + traverseCell(y, x - 1)
                      + traverseCell(y + 1, x) + traverseCell(y - 1, x)

      return caughtFish + grid[y][x]
  }

  for (let i = 0; i < r; i++){
      for (let j = 0; j < c; j++){
          maxFish = Math.max(traverseCell(i, j), maxFish)
      }
  }

  return maxFish
};
