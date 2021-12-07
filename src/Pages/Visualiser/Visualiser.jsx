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

const ANIMATION_DELAY = 50;

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
    let openSet = [];
    let closedSet = [];
    this.clearGrid(grid, true);
    switch (algorithm) {
      case 0:
        astar(grid, rows, columns);
        shortestPath = shortestPathResult(
          grid[COL_START][ROW_START],
          grid[COL_END][ROW__END]
        );
        this.animate(grid, shortestPath, "path");
        break;
      case 1:
        break;
      default:
        console.log("Error choosing Path Finding Algorithm");
        return;
    }
    this.setState({ nodes: grid });
  }

  animate(grid, nodes, nodeType) {
    for (let i = 0; i < nodes.length; i++) {
      switch (nodeType) {
        case "wall":
          setTimeout(() => {
            nodes[i].isWall = true;
            this.setState({ nodes: grid });
          }, ANIMATION_DELAY * i);
          break;
        case "open":
          setTimeout(() => {
            nodes[i].open = true;
            this.setState({ nodes: grid });
          }, ANIMATION_DELAY * i);
          break;
        case "closed":
          setTimeout(() => {
            nodes[i].closed = true;
            this.setState({ nodes: grid });
          }, ANIMATION_DELAY * i);
          break;
        case "path":
          setTimeout(() => {
            nodes[i].isPath = true;
            this.setState({ nodes: grid });
          }, ANIMATION_DELAY * i);
          break;
        default:
          break;
      }

      setTimeout(() => {
        nodes[i].isPath = true;
        this.setState({ nodes: grid });
      }, 50 * i);
    }
  }

  clearGrid(grid, keepWalls) {
    for (var i = 0; i < ROW_LENGTH; i++) {
      for (var j = 0; j < COL_LENGTH; j++) {
        if (!keepWalls) {
          grid[i][j].isWall = false;
        }
        grid[i][j].open = false;
        grid[i][j].closed = false;
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
                    closed={node.closed}
                    open={node.open}
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
    isWall: false,
    open: false,
    closed: false,
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
