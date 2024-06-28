import { useContext } from "react";
import useFormState from "../hooks/useFormState";
import { DiaryContext } from "../contexts/DiaryContext";
import RadioButton from "../UI/RadioButton";
import { validateDiaryForm } from "../utils/validation";
import {
  moodOptions,
  activityOptions,
  mealOptions,
} from "../utils/formOptions";
import "../styles/DiaryForm.css";

const DiaryForm = ({ closeModal }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  const {
    formData: diaryData,
    handleChange,
    handleSubmit,
    errors,
    photoPreview,
  } = useFormState(
    {
      photo: null,
      mood: "",
      activity: "",
      meal: "",
    },
    validateDiaryForm
  );

  const submitForm = (data) => {
    addDiaryEntry(data);
    closeModal();
    console.log("Submitted Data:", data);
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event, submitForm)}
      noValidate
      className="form-container"
    >
      <h2>일기 쓰기</h2>

      <div className="form-group">
        <label htmlFor="photo">1. 오늘의 사진을 추가해주세요. (필수)</label>
        <input
          id="photo"
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
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
