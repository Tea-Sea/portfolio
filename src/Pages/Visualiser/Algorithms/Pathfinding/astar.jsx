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
  var lowestFValue = 100;
  let failsafe = 0;
  openSet.push(currentNode);

  do {
    // Find value in  the openset with lowest F value
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < lowestFValue) {
        lowestFValue = openSet[i].f;
        currentNode = openSet[i];
      }
      console.log(lowestFValue, openSet[i].f);
    }
    lowestFValue = 100;
    // Remove node with lowest F value from the openSet
    openSet.splice(openSet.indexOf(currentNode), 1);
    // Add that same node to the closedSet
    closedSet.push(currentNode);

    if (currentNode === endNode) {
      console.log("solved");
      solved = true;
    } else {
      // GENERATE EACH SUCCESSOR NODE
      // Generate node attributes
      for (let j = 0; j < currentNode.neighbours.length; j++) {
        var nextNode = currentNode.neighbours[j];
        checkWalkable(currentNode, nextNode);
        nextNode.parent = currentNode;

        // If neighbour node is not in the closed set and is walkable
        if (!closedSet.includes(nextNode) && nextNode.isWalkable) {
          // If the neighbour is in the openSet
          if (openSet.includes(nextNode)) {
            //Determine it's score and compare it to it's previous score
            let tentativeF =
              determineGValue(currentNode, nextNode) + nextNode.h;
            // If it's new score is better, assign it this new score and update it's parent
            if (tentativeF < nextNode.f) {
              nextNode.f = tentativeF;
              nextNode.parent = currentNode;
            }
          } else {
            //If the neighbour is not in the openSet, determine its score and add it to the openSet.
            nextNode.g = determineGValue(currentNode, nextNode);
            nextNode.h = heuristic(nextNode, endNode);
            nextNode.f = nextNode.g + nextNode.h;
            nextNode.parent = currentNode;
            openSet.push(nextNode);
          }
        }
      }
    }
    failsafe++;
    if (failsafe > 150) {
      //console.log("CLOSED SET", closedSet.length, closedSet);
      //console.log("OPEN SET", openSet.length, openSet);
      solved = true;
      console.log("failed", failsafe);
    }
  } while (!(solved || openSet.length === 0));
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].selected = true;
  }

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
  let dx = Math.abs(node.column - destination.column);
  let dy = Math.abs(node.row - destination.row);
  return (
    PERPENDICULAR_WIEGHT * (dx + dy) +
    (DIAGONAL_WIEGHT - 2 * PERPENDICULAR_WIEGHT) * Math.min(dx, dy)
  );
}
