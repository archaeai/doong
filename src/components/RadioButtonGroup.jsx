import React from "react";

export default function RadioButtonGroup({ label, name, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="radio-button-group">
        {options.map((option) => (
          <React.Fragment key={option.value}>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              required
            />
            <label htmlFor={option.value}>{option.label}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
