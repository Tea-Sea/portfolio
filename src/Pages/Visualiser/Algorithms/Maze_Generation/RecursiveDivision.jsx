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
  // TODO: Add check so doorways dont open up to a wall
  if (!orientation) {
    for (let i = 0; i < field.height; i++) {
      walls.push(grid[i + field.y][position]);
      grid[i + field.y][position].isWall = true;
    }
    doorway = field.y + Math.floor(Math.random() * field.height);
    grid[doorway][position].isWall = false;
    walls.splice(walls.indexOf(field.height - doorway), 1);
    console.log("DOOR: ", doorway, position);
  } else {
    for (let i = 0; i < field.width; i++) {
      walls.push(grid[position][i + field.x]);
      grid[position][i + field.x].isWall = true;
    }
    doorway = field.x + Math.floor(Math.random() * field.width);
    grid[position][doorway].isWall = false;
    walls.splice(walls.indexOf(field.width - doorway), 1);
    console.log("DOOR: ", position, doorway);
  }
  if (orientation) {
    console.log("line at ", position, "Horizontal");
  } else {
    console.log("line at ", position, "Vertical");
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
    //var linePos = Math.floor(lim / 2);
  } while (linePos < 2 || linePos > lim - 2);

  switch (orientation) {
    case 0:
      sf1 = {
        height: field.height,
        width: linePos,
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
        height: linePos,
        width: field.width,
        x: field.x,
        y: field.y,
      };

      sf2 = {
        height: field.height - linePos - 1,
        width: field.width,
        x: field.x,
        y: field.y + linePos + 1,
      };
      break;
    default:
      console.log("problem with orientation");
      return;
  }
  //console.log("sf1: ", sf1);
  //console.log("sf2: ", sf2);
  sfArray.push(sf1);
  sfArray.push(sf2);
  for (let j = 0; j < sfArray.length; j++) {
    //console.log(sfArray[j]);
  }

  return linePos;
}

function generateSubfields(grid, field, sfArray, walls) {
  let orientation = null;
  let offset = 0;
  if (field.width > 3 || field.height > 3) {
    if (field.width === field.height) {
      orientation = Math.round(Math.random());
    } else if (field.width > field.height) {
      orientation = 0;
    } else {
      orientation = 1;
    }

    if (orientation) {
      offset = field.y;
    } else {
      offset = field.x;
    }

    let linePos = subdivideField(field, orientation, sfArray, walls) + offset;
    sfArray.splice(sfArray.indexOf(field), 1);
    //console.log(sfArray);
    addWalls(grid, field, linePos, orientation, walls);
    //debugger;
    generateSubfields(grid, sfArray[sfArray.length - 1], sfArray, walls);
    //debugger;
    generateSubfields(grid, sfArray[sfArray.length - 1], sfArray, walls);
  } else {
    sfArray.pop();
  }
  if (sfArray.length < 1) {
    console.log("complete");
    return;
  }
}
