import React from "react";

export const Dropdown = ({
  className = "degree-dropdown btn btn-outline-primary",
  options = [],
  defaultValue,
}) => {
  return (
    <select className={className} defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option?.key} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};
