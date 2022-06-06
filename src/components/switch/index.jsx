import React from "react";
import "./switch.scss";

export const Switch = ({ checked, className, onClick }) => (
  <label
    className="switch"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    <input type="checkbox" checked={checked} readOnly/>
    <span className={`slider round ${className}`}></span>
  </label>
);
