import React from "react";

import "./Home.css";

const home = () => {
  return (
    <div id="personalInfo">
      <h1>Tom Caspar</h1>
      <h2>Graduate Software Engineer</h2>
      <a href="https://github.com/Tea-Sea">
        <img className="icon" src="./././icons/Github.png" alt="Github"></img>
      </a>
      <span></span>
      <a href="www.linkedin.com/in/tom-caspar">
        <img className="icon" src="./././icons/LI.png" alt="LinkedIn"></img>
      </a>
    </div>
  );
};

export default home;
