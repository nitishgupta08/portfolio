import React from "react";
import "./prjcts.scss";
import { ProjectData } from "../../ProjectData";
import { Button } from "@mui/material";

export default function Prjcts() {
  return (
    <div className="prjcts" id="prjcts">
      <div className="container">
        <h2>Projects</h2>

        <ul className="cards">
          {ProjectData.map((item, index) => {
            return (
              <li className="card">
                <img src={item.image[0]} height="250px" className="thumbnail" />

                <div className="right">
                  <div className="progInfo">
                    <h3>{item.title}</h3>
                    <p>{item.about}</p>
                    <p>
                      <strong>Languages</strong>: {item.languages}
                    </p>
                  </div>

                  <div className="link">
                    <a href={item.github} target="_blank">
                      <Button variant="contained" className="btn">
                        GitHub
                      </Button>
                    </a>
                    <a href="#">
                      <Button variant="contained" className="btn">
                        Learn More
                      </Button>
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
