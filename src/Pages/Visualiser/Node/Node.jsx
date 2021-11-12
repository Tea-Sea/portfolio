import React from "react";
import { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: this.determineColour(props),
    };
    this.determineColour(props);
  }

  determineColour(props) {
    if (props.isStart) {
      return "start";
    }
    if (props.isEnd) {
      return "end";
    }
    return "node";
  }

  render() {
    const { column, row, isStart, isEnd, isWall, isWalkable, neighbours } =
      this.props;

    const nodeType = isEnd ? "end" : isStart ? "start" : isWall ? "wall" : "";

    return (
      <div className={"node " + nodeType}>
        {column},{row}
      </div>
    );
  }
}
