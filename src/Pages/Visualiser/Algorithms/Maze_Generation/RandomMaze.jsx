// Decides randomly whether a node is a wall or not
// Mostly for testing purposes.
export function randomise(grid, rows, columns) {
  const density = 0.25;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      determineWall(grid[i][j], density);
    }
  }
  return grid;
}

function determineWall(node, density) {
  const rand = Math.random();
  if (rand < density && !(node.isStart || node.isEnd)) {
    node.isWall = true;
  }
}
