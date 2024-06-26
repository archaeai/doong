import React from "react";
import "./RadioButton.css";

export default function RadioButton({
  id,
  name,
  value,
  checked,
  onChange,
  children,
}) {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-input"
      />
      <label htmlFor={id} className="radio-label">
        {children}
      </label>
    </>
  );
}
