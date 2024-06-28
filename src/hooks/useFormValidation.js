import { useState } from "react";
import {
  isNotEmpty,
  isRadioSelected,
  isFileSelected,
} from "../utils/validation";

export default function useFormValidation(initialErrors = {}) {
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = (formData) => {
    const newErrors = {};
    if (!isFileSelected(formData.photo))
      newErrors.photo = "사진을 추가해주세요";
    if (!isRadioSelected(formData.mood)) newErrors.mood = "기분을 선택해주세요";
    if (!isRadioSelected(formData.activity))
      newErrors.activity = "활동량을 선택해주세요";
    if (!isRadioSelected(formData.meal))
      newErrors.meal = "식사량을 선택해주세요";

    setErrors(newErrors);
    return newErrors;
  };

  return { errors, validateForm };
}
