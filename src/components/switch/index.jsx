import React from "react";
import "./switch.scss";

export const Switch = ({ checked, className, onClick }) => (
  <label
    class="switch"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    <input type="checkbox" checked={checked} />
    <span class={`slider round ${className}`}></span>
  </label>
);
