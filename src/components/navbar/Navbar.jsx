import React from "react";
import "./navbar.scss";
import logo from "../../logo.svg";
import Toggle from "../toggle/Toggle";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <a href="#intro">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </div>
        <div className="right">
          {/* <Toggle /> */}
          <ul className="list">
            <li className="navItem">
              <a href="#about" className="nav">
                ABOUT
              </a>
            </li>
            <li className="navItem">
              <a href="#prjcts" className="nav">
                PROJECTS
              </a>
            </li>

            <li className="navItem">
              <a href="#contact" className="nav">
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
