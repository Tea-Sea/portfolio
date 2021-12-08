import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Visualiser from "./Pages/Visualiser/Visualiser";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <a href="/">Home</a>
          <a href="/visualiser">Visualiser</a>
          <a href="/about">About</a>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/visualiser" component={Visualiser} exact />
            <Route path="/about" component={About} />
            <Route component={Error} />
          </Switch>
        </nav>
      </BrowserRouter>
    );
  }
}

export default App;
