import React, { Component } from "react";

import Node from "./Node/Node";

import "./Visualiser.css";

const ROW_LENGTH = 20;
const COL_LENGTH = 20;

const ROW_START = 2;
const COL_START = 5;

const ROW__END = 19;
const COL_END = 19;

export default class visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], selectedNodeData: "None", nodeType: "node" };
  }

  componentDidMount() {
    const nodes = generateGrid();
    this.setState({ nodes }, () => {});
    this.determineType(nodes);
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  determineType(node) {
    console.log("DETERMINE TYPE");
    if (node.isStart) {
      this.setState({ nodeType: "start" });
    }
    if (node.isEnd) {
      this.setState({ nodeType: "end" });
      console.log("MADE IT");
    }
    this.setState({ nodeType: "node" });
  }

  displayData(node) {
    //for debug purposes
    const data =
      "Column: " +
      node.column +
      " Row: " +
      node.row +
      " Start: " +
      node.isStart +
      " End: " +
      node.isEnd +
      " Wall: " +
      node.isWall +
      " Neighbours: " +
      node.neighbours;
    console.log(node.neighbours);
    this.setState({ selectedNodeData: data, nodeType: "selected" });
  }

  render() {
    const { nodes } = this.state;

    return (
      <>
        <div className="grid">
          {nodes.map((row, rowID) => (
            <div key={rowID} className="row">
              {row.map((node, nodeID) => (
                <button
                  key={nodeID}
                  className="column"
                  onClick={() => this.displayData(node)}
                >
                  <Node
                    class="Node"
                    className={this.state.nodeType}
                    column={node.column}
                    row={node.row}
                    isStart={node.isStart}
                    isEnd={node.isEnd}
                    isWall={node.isWall}
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
      //Add perpendicular neighbours
      if (i > 0) nodes[i][j].neighbours.push(nodes[i - 1][j]);
      if (j > 0) nodes[i][j].neighbours.push(nodes[i][j - 1]);
      if (i < ROW_LENGTH - 1) nodes[i][j].neighbours.push(nodes[i + 1][j]);
      if (j < COL_LENGTH - 1) nodes[i][j].neighbours.push(nodes[i][j + 1]);
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
    isWall: column === 9 && row === 8,
    isWalkable: true,
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
