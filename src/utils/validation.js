export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValues(value, otherValue) {
  return value === otherValue;
}

export function isRadioSelected(value) {
  return value !== null && value !== undefined && value !== "";
}

export function isFileSelected(file) {
  return file && file.size > 0;
}
