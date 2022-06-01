import React from "react";

export const Dropdown = ({
  className = "degree-dropdown btn btn-outline-primary",
  options = [],
}) => {
  return (
    <select className={className}>
      {options.map((option) => (
        <option key={option?.key} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};
