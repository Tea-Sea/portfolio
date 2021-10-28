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
  constructor() {
    super();
    this.state = { nodes: [] };
  }

  componentDidMount() {
    const nodes = GenerateGrid();
    this.setState({ nodes }, () => {
      console.log(this.state.nodes, "nodes");
    });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  render() {
    console.log("render");
    console.log(this.state);
    return (
      <>
        <div className="grid"></div>
      </>
    );
  }
}

const GenerateNode = (column, row) => {
  return {
    column,
    row,
    //isStart: column === COL_START && row === ROW_START,
    //isEnd: column === COL_END && row === ROW__END,
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
  }
  return rows;
};
