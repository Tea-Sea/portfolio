//decides randomly whether a node is a wall or not
//mostly for testing purposes.
export function randomiser(grid, rows, columns) {
  const density = 0.3;
  console.log("Entered the randomiser");
  console.log(rows, columns);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      determineWall(grid[i][j], density);
    }
  }
}

function determineWall(node, density) {
  const rand = Math.random();
  if (rand < density) {
    console.log(node);
    node.isWall = true;
  } else {
    node.isWall = false;
  }
}
