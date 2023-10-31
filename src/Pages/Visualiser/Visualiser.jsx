import React, { Component } from 'react';

import Node from './Node/Node';

import { ReactComponent as GithubLogo } from '../../Static/Github.svg';

import { randomise } from './Algorithms/Maze_Generation/Randomiser';

import { recursiveDivison } from './Algorithms/Maze_Generation/RecursiveDivision';

// import {
//   astar,
//   closedSetResult,
//   shortestPathResult,
// } from './Algorithms/Pathfinding/AStar';

import './Visualiser.css';

var ROW_LENGTH = 21;
var COL_LENGTH = 31;

var ROW_START = 0;
var COL_START = 0;

var ROW__END = ROW_LENGTH - 1;
var COL_END = COL_LENGTH - 1;

const ANIMATION_DELAY = 40;

export default class visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], selectedNodeData: 'None', mousePressed: false };
  }

  componentDidMount() {
    document.title = 'Pathfinding Visualiser';
    const nodes = generateGrid();
    this.setState({ nodes }, () => {});
    //this.determineType(nodes);
  }

  generateMaze(algorithm, grid, rows, columns) {
    let maze = [];
    this.clearGrid(grid, false);
    switch (algorithm) {
      case 0:
        maze = randomise(grid, rows, columns);
        break;
      case 1:
        maze = recursiveDivison(grid, rows, columns);
        break;
      default:
        console.error('Error choosing Maze Generation Algorithm');
        return;
    }
    this.setState({ nodes: grid });
    //this.animate(null, null, null, maze);
  }

  findPath(algorithm, grid, rows, columns) {
    let shortestPath = [];
    let closedSet = [];
    this.clearGrid(grid, true);
    switch (algorithm) {
      case 0:
        // astar(grid, rows, columns);
        // closedSet = closedSetResult();
        // shortestPath = shortestPathResult(
        //   grid[ROW_START][COL_START],
        //   grid[ROW__END][COL_END]
        // );
        this.animate(grid, closedSet, shortestPath);
        break;
      case 1:
        break;
      default:
        console.error('Error choosing Path Finding Algorithm');
        return;
    }
    this.setState({ nodes: grid });
  }

  animate(grid, closed, path, walls) {
    if (walls === undefined) {
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
    } else {
      let nodeCount = walls.length;
      for (let i = 0; i < nodeCount; i++) {
        if (i < walls.length) {
          setTimeout(() => {
            walls[i].isWall = true;
            this.setState({ nodes: grid });
          }, ANIMATION_DELAY * i);
        }
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
    if (mouseDown) {
      if (!(node.isStart || node.isEnd)) {
        node.isWall = !node.isWall;
      }
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
    var neighbourData = '';
    node.neighbours.forEach(
      (neighbour) =>
        (neighbourData += '(' + neighbour.column + ',' + neighbour.row + ') ')
    );
    const data = '[' + node.column + ',' + node.row + '] ';
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
    var colWidth = 100 / COL_LENGTH + '%';
    var rowHeight = 99 / ROW_LENGTH + '%';

    return (
      <>
        <div id="visualiser">
          <div
            className="options"
            onClick={() => this.generateMaze(0, nodes, ROW_LENGTH, COL_LENGTH)}
          >
            Generate Random Maze
          </div>
          <div
            className="options"
            onClick={() => this.generateMaze(1, nodes, ROW_LENGTH, COL_LENGTH)}
          >
            Generate Recursive Maze
          </div>
          <div
            className="options"
            onClick={() => this.findPath(0, nodes, ROW_LENGTH, COL_LENGTH)}
          >
            A*
          </div>
          <div className="options" onClick={() => this.clearGrid(nodes, 0)}>
            Clear Board
          </div>
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
          <li id="legend" style={{ height: rowHeight }}>
            <dt className="displayNode">
              <Node isStart="true"></Node>
            </dt>
            <dd className="legendInfo">= Start</dd>
            <span></span>

            <dt className="displayNode">
              <Node isEnd="true"></Node>
            </dt>
            <dd className="legendInfo">= End</dd>
            <span></span>

            <dt className="displayNode">
              <Node isWall="true"></Node>
            </dt>
            <dd className="legendInfo">= Wall</dd>
            <span></span>

            <dt className="displayNode">
              <Node closed="true"></Node>
            </dt>
            <dd className="legendInfo">= Traversed</dd>
            <span></span>

            <dt className="displayNode">
              <Node isPath="true"></Node>
            </dt>
            <dd className="legendInfo">= Path</dd>
            <span></span>
          </li>
          <a
            id="githubLogo"
            href="https://github.com/Tea-Sea/portfolio/tree/main/src/Pages/Visualiser"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubLogo className="icon" />
          </a>
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
