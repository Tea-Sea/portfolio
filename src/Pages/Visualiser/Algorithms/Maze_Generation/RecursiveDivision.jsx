// Recursive Division Maze Generation
// For a rectangular area of nodes, draw a line of walls down the middle
// Punch a hole in this line, repeat until a maze has been formed
export function recursiveDivison(grid, rows, columns) {
  let initialField = {
    height: rows,
    width: columns,
    x: 0,
    y: 0,
  };
  let subfields = [initialField];
  let lines = [];
  let walls = [];
  generateSubfields(grid, initialField, subfields, lines, walls);
  return walls;
}

function addWalls(grid, line, walls) {
  for (let i = 0; i < line.length; i++) {
    grid[line.y + !line.orientation * i][
      line.x + line.orientation * i
    ].isWall = true;
    walls.push(
      grid[line.y + !line.orientation * i][line.x + line.orientation * i]
    );
  }
  walls.splice(
    walls.indexOf(
      grid[line.y + !line.orientation * line.doorway][
        line.x + line.orientation * line.doorway
      ]
    ),
    1
  );

  grid[line.y + !line.orientation * line.doorway][
    line.x + line.orientation * line.doorway
  ].isWall = false;
}

function subdivideField(field, sfArray, lineArray) {
  let sf1;
  let sf2;
  let line;
  let lim;
  let lineOrientation = null;
  // Check field is valid
  if (field.width > 3 || field.height > 3) {
    // Determine Line Orientation
    if (field.width === field.height) {
      // If field square, split randomly
      lineOrientation = Math.round(Math.random());
    } else if (field.width > field.height) {
      // If field wider, split vertically
      lineOrientation = 0;
    } else {
      // If field taller, split horizonatally
      lineOrientation = 1;
    }
    // Determine max value for line position
    if (lineOrientation) {
      lim = field.height;
    } else {
      lim = field.width;
    }
    do {
      // Ensure lines only occur on odd cells
      var splitPosition = Math.floor((Math.random() * lim) / 2) * 2 + 1;
      //var splitPosition = Math.floor(lim / 2);
    } while (splitPosition < 2 || splitPosition > lim - 2);

    // Define subfield 1
    sf1 = {
      x: field.x,
      y: field.y,
      width: field.width * lineOrientation + splitPosition * !lineOrientation,
      height: field.height * !lineOrientation + splitPosition * lineOrientation,
    };

    // Define subfield 2
    sf2 = {
      x: field.x + (splitPosition + 1) * !lineOrientation,
      y: field.y + (splitPosition + 1) * lineOrientation,
      width: field.width - (splitPosition + 1) * !lineOrientation,
      height: field.height - (splitPosition + 1) * lineOrientation,
    };

    //Define line between subfields
    line = {
      x: field.x + splitPosition * !lineOrientation,
      y: field.y + splitPosition * lineOrientation,
      length: field.width * lineOrientation + field.height * !lineOrientation,
      orientation: lineOrientation,
      //Ensure doorways only occur on even cells
      doorway:
        Math.floor(
          (Math.random() *
            (field.width * lineOrientation + field.height * !lineOrientation)) /
            2
        ) * 2,
    };
    // Push objects into respective arrays
    sfArray.push(sf1);
    sfArray.push(sf2);
    lineArray.push(line);
    // Remove current field from array
    sfArray.splice(sfArray.indexOf(field), 1);
  } else {
    sfArray.pop();
  }
}

function generateSubfields(grid, field, sfArray, lineArray, walls) {
  subdivideField(field, sfArray, lineArray);
  if (sfArray.length < 1) {
    return;
  }
  addWalls(grid, lineArray[lineArray.length - 1], walls);
  // Recursively generate subfields
  generateSubfields(
    grid,
    sfArray[sfArray.length - 1],
    sfArray,
    lineArray,
    walls
  );
}
