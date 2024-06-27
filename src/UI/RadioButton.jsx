export default function RadioButton({
  label,
  name,
  options,
  error,
  onChange,
  selectedValue,
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="radio-button-group">
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="control-error">{error}</p>}
    </div>
  );
}
