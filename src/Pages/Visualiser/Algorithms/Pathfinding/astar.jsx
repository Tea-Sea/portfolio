// Astar algorithm

const DIAGONAL_WIEGHT = 1.4;
const PERPENDICULAR_WIEGHT = 1;

export function astar(grid, rows, columns) {
  let solved = false;
  let currentNode = determineStartNode(grid, rows, columns);
  const endNode = determineEndNode(grid, rows, columns);
  currentNode.g = 0;
  currentNode.h = heuristic(currentNode, endNode);
  currentNode.f = currentNode.g + currentNode.h;
  var openSet = [];
  var closedSet = [];
  let nextNode = currentNode;
  let failsafe = 0;
  while (!solved) {
    //console.log(currentNode);

    // Generate node attributes
    for (var j = 0; j < currentNode.neighbours.length; j++) {
      checkWalkable(currentNode, currentNode.neighbours[j]);

      // Add viable nodes to open set
      if (
        !closedSet.includes(currentNode.neighbours[j]) &&
        currentNode.neighbours[j].isWalkable
      ) {
        let tentativeG = currentNode.g + DIAGONAL_WIEGHT;
        if (j < 4) tentativeG = currentNode.g + PERPENDICULAR_WIEGHT;
        let newPath = false;
        if (openSet.includes(currentNode.neighbours[j])) {
          if (tentativeG < currentNode.neighbours[j].g) {
            currentNode.neighbours[j].g = tentativeG;
            newPath = true;
          }
        } else {
          currentNode.neighbours[j].g = tentativeG;
          newPath = true;
          openSet.push(currentNode.neighbours[j]);
        }
        if (newPath) {
          currentNode.neighbours[j].h = heuristic(
            currentNode.neighbours[j],
            endNode
          );
          currentNode.neighbours[j].f =
            currentNode.neighbours[j].g + currentNode.neighbours[j].h;
          currentNode.neighbours[j].parent = currentNode;
        }
      }
    }
    //choosenode
    // Pick best node from open set
    //console.log(openSet.length);
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f <= currentNode.f) {
        nextNode = openSet[i];

        //openSet.splice(i, 1);
      }
      //console.log(openSet[i]);
      if (openSet[i]) openSet[i].traversed = true;
    }
    if (!closedSet.includes(currentNode)) {
      closedSet.push(currentNode);
    }
    openSet.splice(openSet.indexOf(nextNode), 1);
    currentNode = nextNode;
    for (var p = 0; p < closedSet.length; p++) {
      closedSet[p].isWall = true;
    }
    if (currentNode === endNode) {
      console.log("solved");
      console.log("CLOSED SET", closedSet.length, closedSet);
      solved = true;
    }
    failsafe++;
    if (failsafe > 150) {
      console.log("CLOSED SET", closedSet.length, closedSet);
      solved = true;
      console.log("failed");
    }
  }
}

function getNodeAttributes(count, node, currentG, endNode) {
  if (count < 4) {
    if (node.g) node.g = currentG + 1;
  } else {
    node.g = currentG + 1.4;
  }

  node.h = heuristic(node, endNode);
  node.f = node.g + node.h;
}

function checkWalkable(node, destination) {
  // TODO: implement check for diagonal walls
  node.neighbours.forEach((neighbour) => {
    if (neighbour.isWall) {
      neighbour.isWalkable = false;
    } else {
      neighbour.isWalkable = true;
    }
  });
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

function heuristic(node, destination) {
  // Calculate the Manhattan distance from node to destination
  return (
    Math.abs(node.column - destination.column) +
    Math.abs(node.row - destination.row)
  );
}
