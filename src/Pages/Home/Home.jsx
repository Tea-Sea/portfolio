import React from "react";
import { ReactComponent as GithubLogo } from "../../Static/Github.svg";
import { ReactComponent as LinkedInLogo } from "../../Static/LI.svg";
import Resume from "../../Static/Resume.pdf";

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
      <a
        id="resumeButton"
        href={Resume}
        target="_blank"
        rel="noreferrer noopener"
      >
        <button>RESUME</button>
      </a>
    </div>
  );
};

export default home;
