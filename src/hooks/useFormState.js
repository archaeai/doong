import { useState } from "react";

export default function useFormState(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      breed: selectedOption ? selectedOption.value : "",
    }));
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    setFormData, // 필요에 따라 외부에서 상태를 직접 설정할 수 있도록 추가
  };
}
