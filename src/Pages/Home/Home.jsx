import React from "react";
import { ReactComponent as GithubLogo } from "../../Icons/Github.svg";
import { ReactComponent as LinkedInLogo } from "../../Icons/LI.svg";

import "./Home.css";

const home = () => {
  return (
    <div id="personalInfo">
      <h1>Tom Caspar</h1>
      <h2>Graduate Software Engineer</h2>
      <a
        href="https://github.com/Tea-Sea"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GithubLogo className="icon" />
      </a>
      <span></span>
      <a
        href="https://www.linkedin.com/in/tom-caspar"
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedInLogo className="icon" />
      </a>
    </div>
  );
};

export default home;
