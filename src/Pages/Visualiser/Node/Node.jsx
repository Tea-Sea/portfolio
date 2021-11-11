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
    console.log(props, "PROPS");
    return "node";
  }

  render() {
    const { column, row, isStart, isEnd } = this.props;

    return (
      <div className={this.state.node}>
        {column},{row}
      </div>
    );
  }
}
