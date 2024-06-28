import { useContext, useState } from "react";
import { DiaryContext } from "../contexts/DiaryContext";
import RadioButton from "../UI/RadioButton";
import useFilePreview from "../hooks/useFilePreview";
import useFormState from "../hooks/useFormState";
import useFormValidation from "../hooks/useFormValidation";
import "../styles/DiaryForm.css";

const DiaryForm = ({ closeModal }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  const { formData: diaryData, handleChange } = useFormState({
    photo: null,
    mood: "",
    activity: "",
    meal: "",
  });
  const { photoPreview, handleFilePreview } = useFilePreview();
  const { errors, validateForm } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm(diaryData);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log(diaryData);

    addDiaryEntry(diaryData);
    closeModal();
  };

  const moodOptions = [
    { value: "행복", label: "행복" },
    { value: "스트레스", label: "스트레스" },
    { value: "불안", label: "불안" },
  ];

  const activityOptions = [
    { value: "높음", label: "높음" },
    { value: "보통", label: "보통" },
    { value: "낮음", label: "낮음" },
  ];

  const mealOptions = [
    { value: "적정", label: "적정" },
    { value: "부족", label: "부족" },
    { value: "남음", label: "남음" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="form-container">
      <h2>일기 쓰기</h2>

      <div className="form-group">
        <label htmlFor="photo">1. 오늘의 사진을 추가해주세요. (필수)</label>
        <input
          id="photo"
          type="file"
          name="photo"
          accept="image/*"
          onChange={(event) => {
            handleChange(event);
            handleFilePreview(event);
          }}
        />
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "8px" }}
          />
        )}
        {errors.photo && <p className="control-error">{errors.photo}</p>}
      </div>

      <RadioButton
        label="2. 오늘의 기분은 어땠나요? (필수)"
        name="mood"
        options={moodOptions}
        error={errors.mood}
        onChange={handleChange}
        selectedValue={diaryData.mood}
      />
      <RadioButton
        label="3. 오늘의 활동량은 어땠나요? (필수)"
        name="activity"
        options={activityOptions}
        error={errors.activity}
        onChange={handleChange}
        selectedValue={diaryData.activity}
      />
      <RadioButton
        label="4. 오늘의 식사는 어땠나요? (필수)"
        name="meal"
        options={mealOptions}
        error={errors.meal}
        onChange={handleChange}
        selectedValue={diaryData.meal}
      />

      {/* 나머지 폼 필드들... */}
      <div className="form-actions">
        <button type="button" onClick={closeModal} className="button">
          닫기
        </button>
        <button type="submit" className="button">
          저장
        </button>
      </div>
    </form>
  );
};

export default DiaryForm;
