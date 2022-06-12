import React from "react";

export const Dropdown = ({
  className = "degree-dropdown btn btn-outline-primary",
  options = [],
  defaultValue,
  onChange,
}) => {
  return (
    <select
      className={className}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option?.key} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};
