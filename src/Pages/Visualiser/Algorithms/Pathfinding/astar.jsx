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
      // Generate node attributes
      for (let j = 0; j < currentNode.neighbours.length; j++) {
        var neighbour = currentNode.neighbours[j];

        // If neighbour node is not in the closed set and is walkable
        if (
          !closedSet.includes(neighbour) &&
          isNeighbourWalkable(grid, currentNode, neighbour)
        ) {
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
    closedSet[i].closed = true;
  }
  // TODO: Do this in the visualiser
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].open = true;
  }
}

function determineGValue(current, neighbour) {
  if (current.column === neighbour.column || current.row === neighbour.row) {
    return current.g + PERPENDICULAR_WIEGHT;
  } else {
    return current.g + DIAGONAL_WIEGHT;
  }
}

function isNeighbourWalkable(grid, node, neighbour) {
  let walkable = true;
  if (neighbour.isWall) {
    walkable = false;
  } else {
    // Check special case of diagonal walls closing off path to neighbouring node
    if (!(node.column === neighbour.column || node.row === neighbour.row)) {
      walkable = !(
        grid[neighbour.row][node.column].isWall &&
        grid[node.row][neighbour.column].isWall
      );
    } else walkable = true;
  }
  return walkable;
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
      result.unshift(currentNode);
      currentNode = currentNode.parent;
    }
  }
  return result;
}
