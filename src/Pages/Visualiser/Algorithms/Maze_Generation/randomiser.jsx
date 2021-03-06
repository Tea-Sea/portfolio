// Decides randomly whether a node is a wall or not
// Mostly for testing purposes.
export function randomiser(grid, rows, columns) {
  const density = 0.25;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      determineWall(grid[i][j], density);
    }
  }
}

function determineWall(node, density) {
  const rand = Math.random();
  if (rand < density && !(node.isStart || node.isEnd)) {
    node.isWall = true;
  }
}
