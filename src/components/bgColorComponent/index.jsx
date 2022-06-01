import React from "react";

//stylesheet
import "./style.scss";

export const BgcolorHandler = ({ children }) => {
  return (
    <div className="bg-body">
      <div className="linear-grid">{children}</div>
    </div>
  );
};
