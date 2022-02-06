import React from "react";
import "./toggle.scss";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function Toggle() {
  return (
    <div className="t">
      <LightMode fontSize="small" />
      <DarkMode fontSize="small" />

      <div className="button"></div>
    </div>
  );
}
