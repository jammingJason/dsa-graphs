class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.map((vertex) => {
      this.nodes.add(vertex);
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // console.log(vertex.adjacent);
    const entries = vertex.adjacent.entries();
    for (const entry of entries) {
      entry.map((adj) => {
        adj.adjacent.delete(vertex);
        console.log(adj.adjacent);
      });
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let needToVisit = [start];
    let seen = new Set();

    while (needToVisit.length) {
      const visiting = needToVisit.shift();
      seen.add(visiting);
      const allAdj = visiting.adjacent.entries();
      for (const adj of allAdj) {
        adj.map((node) => {
          // console.log(node);
          if (!seen.has(node)) needToVisit.push(node);
        });
      }
    }
    return seen;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let needToVisit = [start];
    let seen = new Set();
    // ["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"]
    while (needToVisit.length) {
      const visiting = needToVisit.shift();
      seen.add(visiting);
      const allAdj = visiting.adjacent.entries();
      for (const adj of allAdj) {
        adj.map((node) => {
          // console.log(node);
          if (!seen.has(node)) needToVisit.unshift(node);
        });
      }
    }
    return seen;
  }
}
// let graph = new Graph();
// let S = new Node('S');
// let P = new Node('P');
// let U = new Node('U');
// let X = new Node('X');
// let Q = new Node('Q');
// let Y = new Node('Y');
// let V = new Node('V');
// let R = new Node('R');
// let W = new Node('W');
// let T = new Node('T');

// graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

// graph.addEdge(S, P);
// graph.addEdge(S, U);

// graph.addEdge(P, X);
// graph.addEdge(U, X);

// graph.addEdge(P, Q);
// graph.addEdge(U, V);

// graph.addEdge(X, Q);
// graph.addEdge(X, Y);
// graph.addEdge(X, V);

// graph.addEdge(Q, R);
// graph.addEdge(Y, R);

// graph.addEdge(Y, W);
// graph.addEdge(V, W);

// graph.addEdge(R, T);
// graph.addEdge(W, T);
// graph.breadthFirstSearch(Y);
// console.log(graph.depthFirstSearch(S));
module.exports = { Graph, Node };
