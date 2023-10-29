// Decides randomly whether a node is a wall or not
// Mostly for testing purposes.
export default function Randomise(grid, rows, columns) {
  const density = 0.25;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      DetermineWall(grid[i][j], density);
    }
  }
}

function DetermineWall(node, density) {
  const rand = Math.random();
  if (rand < density && !(node.isStart || node.isEnd)) {
    node.isWall = true;
  }
}
