import React, { useEffect, useRef } from "react";
import "./intro.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { init } from "ityped";

export default function Intro() {
  const textRef = useRef();
  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["Software Developer", "Web Developer", "Photographer"],
    });
  }, []);
  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imgContainer">
          <img src="assets/profile.jpeg" alt="profile" className="profile" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>Hi There, I'm</h2>
          <h1>Nitish Kumar Gupta</h1>
          <h3>
            <span ref={textRef}></span>
          </h3>
          <a href="#about">
            <KeyboardArrowDownIcon fontSize="large" />
          </a>
        </div>
      </div>
    </div>
  );
}
