//astar algorithm

export function astar(grid, rows, columns) {
  console.log("test");
  var selectedNode = determineStartNode(grid, rows, columns);
  const endNode = determineEndNode(grid, rows, columns);
  determineHeuristic(selectedNode, endNode);
}

function determineStartNode(grid, rows, columns) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (grid[i][j].isStart) {
        return grid[i][j];
      }
    }
  }
  console.error("No startpoint set");
}

function determineEndNode(grid, rows, columns) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (grid[i][j].isEnd) {
        return grid[i][j];
      }
    }
  }
  console.error("No endpoint set");
}

function determineHeuristic(node, destination) {
  // Calculate the Manhattan distance from node to destination
  const dist =
    Math.abs(node.column - destination.column) +
    Math.abs(node.row - destination.row);
  console.log(dist);
}
