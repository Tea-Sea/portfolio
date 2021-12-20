import React, { Component } from "react";

import Node from "./Node/Node";

import { randomiser } from "./Algorithms/Maze_Generation/randomiser";

import {
  astar,
  closedSetResult,
  shortestPathResult,
} from "./Algorithms/Pathfinding/astar";

import "./Visualiser.css";

var ROW_LENGTH = 20;
var COL_LENGTH = 30;

var ROW_START = 0;
var COL_START = 0;

var ROW__END = ROW_LENGTH - 1;
var COL_END = COL_LENGTH - 1;

const ANIMATION_DELAY = 40;

export default class visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], selectedNodeData: "None", mousePressed: false };
  }

  componentDidMount() {
    const nodes = generateGrid();
    this.setState({ nodes }, () => {});
    //this.determineType(nodes);
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
    let closedSet = [];
    this.clearGrid(grid, true);
    switch (algorithm) {
      case 0:
        astar(grid, rows, columns);
        closedSet = closedSetResult();
        shortestPath = shortestPathResult(
          grid[ROW_START][COL_START],
          grid[ROW__END][COL_END]
        );
        this.animate(grid, closedSet, shortestPath);
        break;
      case 1:
        break;
      default:
        console.log("Error choosing Path Finding Algorithm");
        return;
    }
    this.setState({ nodes: grid });
  }

  animate(grid, closed, path) {
    let nodeCount = closed.length;
    for (let i = 0; i < nodeCount; i++) {
      if (i === nodeCount - 1) {
        for (let j = 0; j < path.length; j++) {
          setTimeout(() => {
            path[j].isPath = true;
            this.setState({ nodes: grid });
          }, ANIMATION_DELAY * i);
        }
      }
      if (i < closed.length) {
        setTimeout(() => {
          closed[i].closed = true;
          this.setState({ nodes: grid });
        }, ANIMATION_DELAY * i);
      }
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

  handleNodeClick(node) {
    if (!(node.isStart || node.isEnd)) {
      node.isWall = !node.isWall;
    }
    this.displayData(node);
  }

  handleNodeEnter(node, mouseDown) {
    switch (mouseDown) {
      case true:
        if (!(node.isStart || node.isEnd)) {
          node.isWall = !node.isWall;
        }
        break;
      default:
        break;
    }
    this.displayData(node);
  }

  mouseDownHandler(node) {
    this.setState({ mousePressed: true });
    this.handleNodeEnter(node, true);
  }

  mouseUpHandler() {
    this.setState({ mousePressed: false });
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
    var colWidth = 100 / COL_LENGTH + "%";
    var rowHeight = 99 / ROW_LENGTH + "%";

    return (
      <>
        <div id="visualiser">
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
          <div id="grid">
            {nodes.map((row, rowID) => (
              <div key={rowID} className="row" style={{ height: rowHeight }}>
                {row.map((node, nodeID) => (
                  <div
                    key={nodeID}
                    className="column"
                    onMouseEnter={() =>
                      this.handleNodeEnter(node, this.state.mousePressed)
                    }
                    onMouseDown={() => this.mouseDownHandler(node)}
                    onMouseUp={() => this.mouseUpHandler()}
                    style={{ width: colWidth }}
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
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div id="nodeInfo">
            <b>{this.state.selectedNodeData}</b>
          </div>
          <div id="legend">
            <div
              className="displayNode"
              style={{ width: colWidth, height: rowHeight }}
            >
              <Node
                class="Node"
                column="0"
                row="0"
                isStart="false"
                isEnd="false"
                isWall="false"
                isPath="false"
                closed="false"
                open="false"
              ></Node>
            </div>
            <div className="legendInfo">
              <b>NODE</b>
            </div>
            <Node
              class="Node"
              column="0"
              row="0"
              isStart="false"
              isEnd="false"
              isWall="false"
              isPath="false"
              closed="false"
              open="false"
              style={{ width: colWidth }}
            ></Node>
          </div>
        </div>
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
