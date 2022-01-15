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
  let orientation = 0;
  let fail = 0;
  let lines = [];

  while (subfields.length > 0) {
    if (subfields[subfields.length - 1].width > 3) {
      let lineOffset = subfields[subfields.length - 1].x;
      do {
        var linePos = Math.floor(
          Math.random() * subfields[subfields.length - 1].width
        );
        console.log(linePos);
      } while (
        linePos < 1 ||
        linePos > subfields[subfields.length - 1].width - 1
      );

      let temp = subfields[subfields.length - 1];
      subfields.pop();
      createSubfields(temp, linePos, subfields);
      linePos = linePos + lineOffset;
      drawLine(grid, linePos, orientation);
      lines.push(linePos);
    } else {
      subfields.pop();
    }
    fail++;
    if (fail > 100) {
      subfields.length = 0;
      console.log("failed");
    }
  }
}

function drawLine(grid, position, orientation) {
  for (let i = 0; i < grid.length; i++) {
    grid[i][position].isWall = true;
  }
  console.log("line at ", position);
}

function createSubfields(field, linePos, array) {
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

  array.push(sf1);
  array.push(sf2);
}
