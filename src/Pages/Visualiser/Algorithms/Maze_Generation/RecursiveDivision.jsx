// Recursive Division Maze Generation
// For a rectangular area of nodes, draw a line of walls down the middle
// Punch a hole in this line, repeat until a maze has been formed
export function recursiveDivison(grid, rows, columns) {
  // TODO: Implement Recursive division
  let initialField = {
    height: rows,
    width: columns,
    x: 0,
    y: 0,
  };
  console.log(initialField);
  let subfields = [initialField];
  let walls = [];
  generateSubfields(grid, initialField, subfields, walls);
  let fail = 0;
  fail++;
  if (fail > 100) {
    subfields.length = 0;
    console.log("failed");
  }
}

function addWalls(grid, field, position, walls) {
  let doorway = Math.floor(Math.random() * field.height);
  for (let i = 0; i < field.height; i++) {
    walls.push(grid[i][position]);
    grid[i][position].isWall = true;
  }
  grid[doorway][position].isWall = false;
  walls.splice(walls.indexOf(doorway), 1);
  console.log("line at ", position);
}

function subdivideField(field, sfArray, wallArray) {
  do {
    var linePos = Math.floor(Math.random() * field.width);
    console.log(linePos);
    //var linePos = Math.floor(field.width / 2);
  } while (linePos < 1 || linePos > field.width - 2);

  let sf1 = {
    height: field.height,
    width: linePos - 1,
    x: field.x,
    y: field.y,
  };

  let sf2 = {
    height: field.height,
    width: field.width - linePos - 1,
    x: field.x + linePos + 1,
    y: field.y,
  };

  sfArray.push(sf1);
  sfArray.push(sf2);
  return linePos;
}

function generateSubfields(grid, field, sfArray, walls) {
  let orientation = 0;

  if (field.width > 3) {
    let linePos = subdivideField(field, sfArray, walls) + field.x;
    sfArray.splice(sfArray.indexOf(field), 1);
    addWalls(grid, field, linePos, walls);
    generateSubfields(grid, sfArray[sfArray.length - 1], sfArray, walls);
    generateSubfields(grid, sfArray[sfArray.length - 1], sfArray, walls);
  } else {
    sfArray.pop();
  }
  if (sfArray.length < 1) {
    console.log("complete");
    return;
  }
}
