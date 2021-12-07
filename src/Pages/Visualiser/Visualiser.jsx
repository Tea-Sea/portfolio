import React, { Component } from "react";

import Node from "./Node/Node";

import { randomiser } from "./Algorithms/Maze_Generation/randomiser";

import { astar, shortestPathResult } from "./Algorithms/Pathfinding/astar";

import "./Visualiser.css";

const ROW_LENGTH = 20;
const COL_LENGTH = 20;

const ROW_START = 0;
const COL_START = 0;

const ROW__END = 15;
const COL_END = 15;

export default class visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], selectedNodeData: "None", nodeType: "node" };
  }

  componentDidMount() {
    const nodes = generateGrid();
    this.setState({ nodes }, () => {});
    //this.determineType(nodes);
  }

  handleNodeClick(node) {
    if (!(node.isStart || node.isEnd)) {
      node.isWall = !node.isWall;
      // node.neighbours.forEach((neighbour) => (neighbour.traversed = true));
    }
    this.displayData(node);
  }

  generateMaze(algorithm, grid, rows, columns) {
    this.clearGrid(grid, false);
    switch (algorithm) {
      case 0:
        randomiser(grid, rows, columns);
        break;
      case 1:
        break;
      default:
        console.log("Error choosing Maze Generation Algorithm");
        return;
    }
    this.setState({ nodes: grid });
  }

  findPath(algorithm, grid, rows, columns) {
    let shortestPath = [];
    this.clearGrid(grid, true);
    switch (algorithm) {
      case 0:
        astar(grid, rows, columns);
        shortestPath = shortestPathResult(
          grid[COL_START][ROW_START],
          grid[COL_END][ROW__END]
        );
        console.log(shortestPath);
        for (let i = 0; i < shortestPath.length; i++) {
          // shortestPath[i].isPath = true;
          // console.log(shortestPath[i]);
          // shortestPath.pop(shortestPath.length);

          setTimeout(() => {
            shortestPath[i].isPath = true;
            this.setState({ nodes: grid });
          }, 50 * i);
        }
        break;
      case 1:
        break;
      default:
        console.log("Error choosing Path Finding Algorithm");
        return;
    }
    this.setState({ nodes: grid });
  }

  clearGrid(grid, keepWalls) {
    for (var i = 0; i < ROW_LENGTH; i++) {
      for (var j = 0; j < COL_LENGTH; j++) {
        if (!keepWalls) {
          grid[i][j].isWall = false;
        }
        grid[i][j].traversed = false;
        grid[i][j].selected = false;
        grid[i][j].isPath = false;
        grid[i][j].parent = undefined;
      }
    }
    this.setState({ nodes: grid });
  }

  displayData(node) {
    // for debug purposes
    var neighbourData = "";
    node.neighbours.forEach(
      (neighbour) =>
        (neighbourData += "(" + neighbour.column + "," + neighbour.row + ") ")
    );
    const data = "[" + node.column + "," + node.row + "] ";
    // " Start: " +
    // node.isStart +
    // " End: " +
    // node.isEnd +
    // " W: " +
    // node.isWall +
    // " T: " +
    // node.traversed +
    // " Neighbours: " +
    // neighbourData +
    // " F: " +
    // node.f +
    // " G: " +
    // node.g +
    // " H: " +
    // node.h;
    //console.log(node.neighbours);
    this.setState({ selectedNodeData: data });
  }

  render() {
    const { nodes } = this.state;

    return (
      <>
        <div className="grid">
          <button
            className="randomise"
            onClick={() => this.generateMaze(0, nodes, ROW_LENGTH, COL_LENGTH)}
          >
            Generate Maze
          </button>
          <button
            className="pathfind"
            onClick={() => this.findPath(0, nodes, ROW_LENGTH, COL_LENGTH)}
          >
            A*
          </button>
          {nodes.map((row, rowID) => (
            <div key={rowID} className="row">
              {row.map((node, nodeID) => (
                <button
                  key={nodeID}
                  className="column"
                  onMouseDown={() => this.handleNodeClick(node)}
                >
                  <Node
                    class="Node"
                    column={node.column}
                    row={node.row}
                    isStart={node.isStart}
                    isEnd={node.isEnd}
                    isWall={node.isWall}
                    isPath={node.isPath}
                    selected={node.selected}
                    traversed={node.traversed}
                  ></Node>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div>{this.state.selectedNodeData}</div>
      </>
    );
  }
}

const generateNeighbours = (nodes) => {
  for (var i = 0; i < ROW_LENGTH; i++) {
    for (var j = 0; j < COL_LENGTH; j++) {
      // Add perpendicular neighbours
      if (i > 0) nodes[i][j].neighbours.push(nodes[i - 1][j]);
      if (j > 0) nodes[i][j].neighbours.push(nodes[i][j - 1]);
      if (i < ROW_LENGTH - 1) nodes[i][j].neighbours.push(nodes[i + 1][j]);
      if (j < COL_LENGTH - 1) nodes[i][j].neighbours.push(nodes[i][j + 1]);

      // Add diagonal neighbours
      if (i > 0 && j > 0) nodes[i][j].neighbours.push(nodes[i - 1][j - 1]);
      if (i < ROW_LENGTH - 1 && j > 0)
        nodes[i][j].neighbours.push(nodes[i + 1][j - 1]);
      if (i > 0 && j < COL_LENGTH - 1)
        nodes[i][j].neighbours.push(nodes[i - 1][j + 1]);
      if (i < ROW_LENGTH - 1 && j < COL_LENGTH - 1)
        nodes[i][j].neighbours.push(nodes[i + 1][j + 1]);
    }
  }
  return nodes;
};

const generateNode = (column, row) => {
  return {
    column: column,
    row: row,
    isStart: column === COL_START && row === ROW_START,
    isEnd: column === COL_END && row === ROW__END,
    isWall: (column === 9 && row === 8) || (column === 8 && row === 8),
    traversed: false,
    selected: false,
    neighbours: [],
  };
};

const generateGrid = () => {
  var rows = [];
  for (var i = 0; i < ROW_LENGTH; i++) {
    var columns = [];
    for (var j = 0; j < COL_LENGTH; j++) {
      columns.push(generateNode(j, i));
    }
    rows.push(columns);
  }
  rows = generateNeighbours(rows);
  return rows;
};
