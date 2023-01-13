/*
Find if Path Exists in Graph
There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). 
The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge 
between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.
You want to determine if there is a valid path that exists from vertex source to vertex destination.
Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.
*/

var validPath = function(n, edges, source, destination) {

  // create adjacency list for graph
  let map = {};
  for (let i = 0; i < edges.length; i ++){
    let x = edges[i][0];
    let y = edges[i][1];
    if (!map[x]) {
      map[x] = [];
    }
    map[x].push(y);
    if (!map[y]) {
      map[y] = [];
    }
    map[y].push(x);
  }
  
  // create queue to move along graph, visited array to mark if node has been checked
  let visited = new Array(n);
  visited[source] = true;
  let queue = [source];
  

  while (queue.length){
    let node = queue.shift();
    if (node === destination) {
      return true;
    }
    for (let i = 0; i < map[node].length; i++){
      let x = map[node][i];
      if (visited[x] !== true){
        visited[x] = true;
        queue.push(x);
      }
    }
  }
  
  return false;
};

/*
Keys and Rooms

There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. 
However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, 
and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, 
return true if you can visit all the rooms, or false otherwise.

*/

/**
 * @param {number[][]} rooms
 * @return {boolean}
 */

//BFS, graph
// Space complexity: O(n), n = rooms.length;
// Time complexity: O(2n + k), n = rooms.length, k = total number of keys = total pieces of integers in rooms array
var canVisitAllRooms = function(rooms) {
  let visited = new Array(rooms.length);
  visited.fill(false);
  visited[0] = true;

  let queue = rooms[0];
  while (queue.length > 0){
    let key = queue.shift();
    visited[key] = true;
    for (let i = 0; i < rooms[key].length; i++){
      if (visited[rooms[key][i]] === false){
        queue.push(rooms[key][i])
      }
    }
  }

  return visited.every(ele => ele);
};

/*
Minimum Time to Collect All Apples in a Tree
Given an undirected tree consisting of n vertices numbered from 0 to n-1, which has some apples in their vertices. You spend 1 second to walk 
over one edge of the tree. 
Return the minimum time in seconds you have to spend to collect all apples in the tree, starting at vertex 0 and coming back to this vertex.

The edges of the undirected tree are given in the array edges, where edges[i] = [ai, bi] means that exists an edge 
connecting the vertices ai and bi. Additionally, there is a boolean array hasApple, where hasApple[i] = true means that vertex i has an apple; 
otherwise, it does not have any apple.
*/

var minTime = function(n, edges, hasApple) {
  if (n === 1) return hasApple[0]? 2 : 0;
  let tree = {};
  createTree(edges, tree);
  return findApple(0, tree, hasApple);
};

const findApple = (node, tree, hasApple, visited = {}) => {
  if (visited[node]) return 0;
  visited[node] = true;
  if (tree[node] === undefined) return hasApple[node]? 2 : 0;
  let sec = 0;

  const createTree = (edges, tree) => {
    for (let [a,b] of edges){
      if (tree[a] === undefined) tree[a] = [];
      if (tree[b] === undefined) tree[b] = [];
      tree[a].push(b);
      tree[b].push(a);
    }
  }

  for (let branch of tree[node]){
      sec += findApple(branch, tree, hasApple, visited);
  }
  if (node === 0) return sec;
  if (sec === 0) return hasApple[node]? 2: 0;
  return sec + 2;
}



/*
Number of Nodes in the Sub-Tree With the Same Label
*/

var countSubTrees = function(n, edges, labels) {
  let tree = createTree(edges);
  let ans = new Array(n);

  const check = (curr, prev) => {
    let count = new Array(26);
    count.fill(0);
    for (let next of tree[curr]){
      if (next !== prev){
        let temp = check(next, curr);
        for (let i = 0; i < 26; i++){
          count[i] += temp[i];
        }
      }
    }
    count[labels.charCodeAt(curr) - 97] += 1
    ans[curr] = count[labels.charCodeAt(curr) - 97];
    return count;
  }

  const createTree = (edges, tree={}) => {
    for (let [a,b] of edges){
      if (tree[a] === undefined) tree[a] = [];
      if (tree[b] === undefined) tree[b] = [];
      tree[a].push(b);
      tree[b].push(a);
    }
    return tree;
  }

  check(0, null);
  return ans;
}

