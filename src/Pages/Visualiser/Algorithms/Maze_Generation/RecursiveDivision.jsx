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

function addWalls(grid, field, position, orientation, walls) {
  let doorway = null;
  if (!orientation) {
    for (let i = 0; i < field.height; i++) {
      walls.push(grid[i + field.y][position]);
      grid[i + field.y][position].isWall = true;
    }
    // doorway = Math.floor(Math.random() * field.height);
    // grid[doorway][position].isWall = false;
    // walls.splice(walls.indexOf(field.height - doorway), 1);
  } else {
    for (let i = 0; i < field.width; i++) {
      walls.push(grid[position][i + field.x]);
      grid[position][i + field.x].isWall = true;
    }
    // doorway = Math.floor(Math.random() * field.width);
    // grid[position][doorway].isWall = false;
    // walls.splice(walls.indexOf(field.width - doorway), 1);
  }
  console.log("line at ", position);
  if (orientation) {
    console.log("Horizontal");
  } else {
    console.log("Vertical");
  }
}

function subdivideField(field, orientation, sfArray) {
  var sf1;
  var sf2;
  var lim;
  if (orientation) {
    lim = field.height;
  } else {
    lim = field.width;
  }
  do {
    var linePos = Math.floor(Math.random() * lim);
  } while (linePos < 1 || linePos > lim - 2);

  switch (orientation) {
    case 0:
      sf1 = {
        height: field.height,
        width: linePos - 1,
        x: field.x,
        y: field.y,
      };

      sf2 = {
        height: field.height,
        width: field.width - linePos - 1,
        x: field.x + linePos + 1,
        y: field.y,
      };

      break;
    case 1:
      sf1 = {
        height: linePos - 1,
        width: field.width,
        x: field.x,
        y: field.y,
      };

      sf2 = {
        height: field.width - linePos - 1,
        width: field.width,
        x: field.x,
        y: field.y + linePos + 1,
      };
      break;
    default:
      console.log("problem with orientation");
      return;
  }
  sfArray.push(sf1);
  sfArray.push(sf2);
  return linePos;
}

function generateSubfields(grid, field, sfArray, walls) {
  let orientation = null;
  let offset = 0;
  if (field.width === field.height) {
    orientation = Math.round(Math.random());
    console.log("EQUAL");
  } else if (field.width > field.height) {
    orientation = 0;
    offset = field.x;
  } else {
    orientation = 1;
    offset = field.y;
  }
  if (field.width > 3 || field.height > 3) {
    let linePos = subdivideField(field, orientation, sfArray, walls) + offset;
    sfArray.splice(sfArray.indexOf(field), 1);
    addWalls(grid, field, linePos, orientation, walls);
    generateSubfields(grid, sfArray[sfArray.length - 1], sfArray, walls);
    generateSubfields(grid, sfArray[sfArray.length - 1], sfArray, walls);
  } else {
    sfArray.pop();
  }
  console.log(orientation);
  if (sfArray.length < 1) {
    console.log("complete");
    return;
  }
}
