import { useState } from "react";

export default function useFormState(initialState, validateStep) {
  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "neutered" ? value === "true" : value,
      }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      breed: selectedOption ? selectedOption.value : "",
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setStep(1);
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = validateStep(formData, step);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = (event, submitCallback) => {
    event.preventDefault();
    if (validateForm()) {
      submitCallback(formData);
      resetForm();
    }
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    step,
    resetForm,
    errors,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    photoPreview,
  };
}
