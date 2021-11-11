import React from "react";
import { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      column,
      row,
      //isStart,
    } = this.props;
    return (
      <div className="node">
        {column},{row}
      </div>
    );
  }
}
