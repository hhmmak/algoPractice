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

/*
Find Closest Node to Given Two Nodes
You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.

The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge 
from node i to node edges[i]. If there is no outgoing edge from i, then edges[i] == -1.

You are also given two integers node1 and node2.

Return the index of the node that can be reached from both node1 and node2, such that the maximum between 
the distance from node1 to that node, and from node2 to that node is minimized. If there are multiple answers, return the node 
with the smallest index, and if no possible answer exists, return -1.

Note that edges may contain cycles.
*/


var closestMeetingNode = function(edges, node1, node2) {

  const find = (node1, node2, visited1, visited2) => {
    if (visited2[node1] && visited1[node2] && node1 !== -1 && node2 !== -1) {
      return Math.min(node1, node2);
    }
    if (visited2[node1] && node1 !== -1) return node1;
    if (visited1[node2] && node2 !== -1) return node2;
    if (node1 === node2) return node1;
    if (visited1[node1] && visited2[node2]) return -1;
    
    visited1[node1] = true;
    visited2[node2] = true;

    let next1 = edges[node1];
    let next2 = edges[node2];
    if (node1 === -1) next1 = -1;
    if (node2 === -1) next2 = -1;

    return find(next1, next2, visited1, visited2);
  }
  

  let result = find(node1, node2, {}, {});


  return result;
};

/*
Reorder Routes to Make All Paths Lead to the City Zero
There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this 
network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.
Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.
This year, there will be a big event in the capital (city 0), and many people want to travel to this city.
Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.
It's guaranteed that each city can reach city 0 after reorder.
*/

var minReorder = function(n, connections) {
  let graphTo = {}
  let graphFrom = {}; 
  let reorder = 0;
  
  for (let [a,b] of connections){
      if (graphFrom[a] === undefined) graphFrom[a] = [];
      if (graphTo[b] === undefined) graphTo[b] = [];
      graphFrom[a].push(b);
      graphTo[b].push(a);
  }

  // console.log(graphFrom, graphTo)

  let visited = new Array(n)
  let queue = [0];
  while (queue.length > 0){
      let city = queue.shift();
      // console.log(city, graphTo[city])
      if (graphTo[city]){        
          for (let n of graphTo[city]){
              if (visited[n] === undefined) queue.push(n);
          }
      }
      if (graphFrom[city]){
          for (let n of graphFrom[city]){
              if (visited[n] === undefined){
                  queue.push(n);
                  reorder ++;
              }
          }
      }
      visited[city] = true;
  }


  return reorder;
};

/*
  Count Unreachable Pairs of Nodes in an Undirected Graph
*/

var countPairs = function(n, edges) {
  let graph = {};

  for (let [a,b] of edges){
      if (graph[a] === undefined) graph[a] = [];
      if (graph[b] === undefined) graph[b] = [];
      graph[a].push(b);
      graph[b].push(a);
  }

  let visited = new Array(n);
  let pairs = 0;

  for (let i = 0; i < n; i ++){
      if (visited[i] === undefined){
          let neighborCount = 0;
          if (graph[i]){
              let queue = [i];
              while (queue.length > 0){
                  let node = queue.shift();
                  if (visited[node] === undefined){
                  for (let neighbor of graph[node]){
                      if (visited[neighbor] === undefined){
                          queue.push(neighbor);
                      }
                  }
                  visited[node] = true;
                  neighborCount ++;
                  }
              }

              pairs += (n - neighborCount) * (neighborCount)
          } else {

              pairs += n - 1;
          }
      }
      visited[i] = true;
  }
  return pairs / 2;
};