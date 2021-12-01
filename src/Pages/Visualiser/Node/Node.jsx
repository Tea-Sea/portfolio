import React from "react";
import { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: "",
    };
  }

  render() {
    const { column, row, isStart, isEnd, isWall, traversed, selected } =
      this.props;
    const nodeType = isEnd
      ? "end"
      : isStart
      ? "start"
      : isWall
      ? "wall"
      : selected
      ? "selected"
      : traversed
      ? "traversed"
      : "";
    return (
      <div className={"node " + nodeType}>
        {column},{row}
      </div>
    );
  }
}
