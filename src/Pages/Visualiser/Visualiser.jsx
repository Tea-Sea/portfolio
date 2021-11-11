import React, { Component } from "react";

import Node from "./Node/Node";

import "./Visualiser.css";

const ROW_LENGTH = 20;
const COL_LENGTH = 20;

const ROW_START = 0;
const COL_START = 5;

const ROW__END = 19;
const COL_END = 19;

export default class visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], selectedNode: "None" };
  }

  componentDidMount() {
    const nodes = GenerateGrid();
    this.setState({ nodes }, () => {});
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  displayData(node) {
    const data =
      "Column: " +
      node.column +
      " Row: " +
      node.row +
      " Start: " +
      node.isStart +
      " End: " +
      node.isEnd;
    this.setState({ selectedNode: data });
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
                    className="node"
                    column={node.column}
                    row={node.row}
                    isStart={node.isStart}
                    isEnd={node.isEnd}
                  ></Node>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div>{this.state.selectedNode}</div>
      </>
    );
  }
}

const GenerateNode = (column, row) => {
  return {
    column: column,
    row: row,
    isStart: column === COL_START && row === ROW_START,
    isEnd: column === COL_END && row === ROW__END,
  };
};

const GenerateGrid = () => {
  const rows = [];
  for (var i = 0; i < ROW_LENGTH; i++) {
    const columns = [];
    for (var j = 0; j < COL_LENGTH; j++) {
      columns.push(GenerateNode(j, i));
    }
    rows.push(columns);
    //console.log(rows.column, "column accessed");
  }
  return rows;
};
