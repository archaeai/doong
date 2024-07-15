import { useId } from "react";
import "../styles/RadioButton.css";

export default function RadioButton({
  label,
  name,
  options,
  error,
  onChange,
  selectedValue,
}) {
  const groupId = useId();
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="radio-button-group">
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={`${groupId}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
            />
            <label htmlFor={`${groupId}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="control-error">{error}</p>}
    </div>
  );
}
