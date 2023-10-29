import React from 'react';
import { ReactComponent as GithubLogo } from '../../Static/Github.svg';
import { ReactComponent as LinkedInLogo } from '../../Static/LI.svg';

import './Home.css';

const Home = () => {
  document.title = 'Home';
  return (
    <div id="personalInfo">
      <h1>Tom Caspar</h1>
      <h2 id="subheading">Software Engineer</h2>
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
      <div></div>
    </div>
  );
};

export default Home;
