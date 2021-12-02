// Astar algorithm

const DIAGONAL_WIEGHT = Math.SQRT2;
const PERPENDICULAR_WIEGHT = 1;

export function astar(grid, rows, columns) {
  var solved = false;
  let currentNode = determineStartNode(grid, rows, columns);
  const endNode = determineEndNode(grid, rows, columns);
  currentNode.g = 0;
  currentNode.h = heuristic(currentNode, endNode);
  currentNode.f = currentNode.g + currentNode.h + 1;
  var openSet = [];
  var closedSet = [];
  openSet.push(currentNode);

  do {
    // Find value in  the openset with lowest F value
    currentNode = getLowestFNode(openSet);
    // Remove node with lowest F value from the openSet
    openSet.splice(openSet.indexOf(currentNode), 1);
    // Add that same node to the closedSet
    closedSet.push(currentNode);

    if (currentNode === endNode) {
      console.log("solved");
      solved = true;
    } else {
      checkWalkableNeighbours(currentNode, currentNode.neighbours);
      // Generate node attributes
      for (let j = 0; j < currentNode.neighbours.length; j++) {
        var neighbour = currentNode.neighbours[j];
        // If neighbour node is not in the closed set and is walkable
        if (!closedSet.includes(neighbour) && neighbour.isWalkable) {
          // If the neighbour is in the openSet
          if (openSet.includes(neighbour)) {
            //Determine it's score and compare it to it's previous score
            let tentativeF =
              determineGValue(currentNode, neighbour) + neighbour.h;
            // If it's new score is better, assign it this new score and update it's parent
            if (tentativeF < neighbour.f) {
              neighbour.f = tentativeF;
              neighbour.parent = currentNode;
            }
          } else {
            //If the neighbour is not in the openSet, determine its score and add it to the openSet.
            neighbour.g = determineGValue(currentNode, neighbour);
            neighbour.h = heuristic(neighbour, endNode);
            neighbour.f = neighbour.g + neighbour.h;
            neighbour.parent = currentNode;
            openSet.push(neighbour);
          }
        }
      }
    }
  } while (!(solved || openSet.length === 0));

  // TODO: Do this in the visualiser
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].selected = true;
  }
  // TODO: Do this in the visualiser
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].traversed = true;
  }
}

function determineGValue(current, neighbour) {
  if (current.column === neighbour.column || current.row === neighbour.row) {
    return current.g + PERPENDICULAR_WIEGHT;
  } else {
    return current.g + DIAGONAL_WIEGHT;
  }
}

function checkWalkableNeighbours(node) {
  // TODO: implement check for diagonal walls

  // if same row has wall, check to see if same column have wall, intersect = unwalkable

  for (let i = 0; i < node.neighbours.length; i++) {
    if (node.neighbours[i].iswall) {
      if (node.neighbours[i].row === node.row) {
      }
    }
  }

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
  // Calculate the diagonal distance from node to destination
  let dx = Math.abs(node.column - destination.column);
  let dy = Math.abs(node.row - destination.row);
  return (
    PERPENDICULAR_WIEGHT * (dx + dy) +
    (DIAGONAL_WIEGHT - 2 * PERPENDICULAR_WIEGHT) * Math.min(dx, dy)
  );
}

function getLowestFNode(openSet) {
  let lowestFValue = openSet[0].f + 1;
  let result;
  for (var i = 0; i < openSet.length; i++) {
    if (openSet[i].f < lowestFValue) {
      lowestFValue = openSet[i].f;
      result = openSet[i];
    }
  }
  return result;
}

export function shortestPathResult(startNode, endNode) {
  const result = [];
  let currentNode = endNode;
  if (currentNode.parent) {
    while (currentNode !== startNode) {
      result.push(currentNode);
      currentNode = currentNode.parent;
    }
  }
  return result;
}
