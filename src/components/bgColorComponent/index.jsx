import React from "react";

//stylesheet
import "./style.scss";

export const BgcolorHandler = ({ children, custombgColorClass }) => {
  return (
    <div className={`${custombgColorClass ?? "bg-body"}`}>
      <div className={`${!custombgColorClass ?? "linear-grid"}`}>
        {children}
      </div>
    </div>
  );
};
