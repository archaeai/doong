import { useState } from "react";

export default function useFormValidation(initialErrors = {}, validateForm) {
  const [errors, setErrors] = useState(initialErrors);

  const runValidation = (formData) => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);
    return newErrors;
  };

  return { errors, runValidation };
}
