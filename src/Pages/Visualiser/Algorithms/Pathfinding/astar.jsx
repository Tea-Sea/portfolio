// Astar algorithm
export function astar(grid, rows, columns) {
  let solved = false;
  let currentNode = determineStartNode(grid, rows, columns);
  const endNode = determineEndNode(grid, rows, columns);
  currentNode.g = 0;
  currentNode.h = heuristic(currentNode, endNode);
  currentNode.f = currentNode.g + currentNode.h;
  var openSet = [];

  while (!solved) {
    let nextNode = currentNode;
    // Generate node attributes
    for (var j = 0; j < currentNode.neighbours.length; j++) {
      checkWalkable(currentNode, currentNode.neighbours[j]);
      getNodeAttributes(currentNode.neighbours.j, currentNode.g);
      if (j < 4) {
        currentNode.neighbours[j].g = currentNode.g + 1;
      } else {
        currentNode.neighbours[j].g = currentNode.g + 1;
      }

      currentNode.neighbours[j].h = heuristic(
        currentNode.neighbours[j],
        endNode
      );
      currentNode.neighbours[j].f =
        currentNode.neighbours[j].g + currentNode.neighbours[j].h;
      // Add viable nodes to open set
      if (
        !openSet.includes(currentNode.neighbours[j]) &&
        !currentNode.neighbours[j].traversed
      ) {
        openSet.push(currentNode.neighbours[j]);
      }
    }
    // Pick best node from open set
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f <= currentNode.f) {
        nextNode = openSet[i];
        currentNode.traversed = true;
        //openSet.pop(currentNode);
      }
    }
    currentNode = nextNode;
    if (currentNode === endNode) {
      console.log("solved");
      solved = true;
    }
  }
}

function heuristic(node, destination) {
  // Calculate the Manhattan distance from node to destination
  return (
    Math.abs(node.column - destination.column) +
    Math.abs(node.row - destination.row)
  );
}

function getNodeAttributes(node, currentG) {}

function checkWalkable(node, destination) {
  // TODO: implement check for diagonal walls
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
