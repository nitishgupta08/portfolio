import React from "react";
import "./about.scss";
import { LinearProgress } from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  GitHub,
  Twitter,
} from "@mui/icons-material";

export default function About() {
  return (
    <div className="about" id="about">
      <div className="aboutme">
        <h2>About Me</h2>
        <p>
          I am currently in 3rd year at LNMIIT. I'm a very enthusiastic
          programmer, always looking for new challenges. I am fluent in
          C/C++/Python. In my free time, I like playing badminton and video
          games. My other hobbies are photography and traveling. My favorite
          book is The Art of Everyday Linux Things by Chris Coyier (if you're
          interested in that). Other books include Perl Programming the Language
          X with Erik Wiborg and programming Languages Without Borders: A
          Practical Guide to Programmer Diversity on Any Platform from Windows
          Phone to IoT, two Python Books. If there's anything else I can do or
          don't know about this project I'd love feedback!
        </p>
      </div>
      <div className="topicStrength">
        <ul className="list">
          <li className="listItem">
            <i class="devicon-c-plain"></i>
            <LinearProgress variant="determinate" value={90} />
          </li>
          <li className="listItem">
            <i class="devicon-cplusplus-plain"></i>
            <LinearProgress variant="determinate" value={95} />
          </li>
          <li className="listItem">
            <i class="devicon-python-plain"></i>
            <LinearProgress variant="determinate" value={70} />
          </li>
          <li className="listItem">
            <i class="devicon-html5-plain"></i>
            <LinearProgress variant="determinate" value={95} />
          </li>
          <li className="listItem">
            <i class="devicon-css3-plain"></i>
            <LinearProgress variant="determinate" value={80} />
          </li>
          <li className="listItem">
            <i class="devicon-javascript-plain"></i>
            <LinearProgress variant="determinate" value={80} />
          </li>
          <li className="listItem">
            <i class="devicon-react-original"></i>
            <LinearProgress variant="determinate" value={70} />
          </li>
          <li className="listItem">
            <i class="devicon-django-plain"></i>
            <LinearProgress variant="determinate" value={50} />
          </li>
          <li className="listItem">
            <i class="devicon-java-plain-wordmark"></i>
            <LinearProgress variant="determinate" value={40} />
          </li>
        </ul>
      </div>
      <div className="socials">
        <a
          href="https://www.linkedin.com/in/nitish-kumar-gupta-667bb018a/"
          target="_blank"
          rel="noreferrer"
          className="icon linkedin">
          <LinkedIn fontSize="large" />
        </a>
        <a
          href="https://github.com/nitishgupta08"
          target="_blank"
          rel="noreferrer"
          className="icon github">
          <GitHub fontSize="large" />
        </a>
        <a
          href="https://www.instagram.com/_nitishgupta/"
          target="_blank"
          rel="noreferrer"
          className="icon instagram">
          <Instagram fontSize="large" />
        </a>
        <a
          href="https://twitter.com/_nitishgupta"
          target="_blank"
          rel="noreferrer"
          className="icon twitter">
          <Twitter fontSize="large" />
        </a>
        <a
          href="https://www.facebook.com/nitishgupta.87/"
          target="_blank"
          rel="noreferrer"
          className="icon facebook">
          <Facebook fontSize="large" />
        </a>
      </div>
    </div>
  );
}
