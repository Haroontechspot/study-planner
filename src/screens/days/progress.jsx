import React from "react";

export const ProgressFields = ({
  label,
  value,
  name,
  onFocusOut,
  disable = false,
}) => {
  return (
    <div className={`progress ${disable && "disabled"}`}>
      <div className="label">{label}</div>
      <div className="input-container">
        <input
          className="input-box"
          type="number"
          value={value}
          onChange={({ target: { value } }) =>
            value >= 0 && onFocusOut(name, parseInt(value))
          }
          disabled={disable}
        />
      </div>
      <div className="hours-label">Hrs</div>
    </div>
  );
};
