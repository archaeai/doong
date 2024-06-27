import { useContext, useState } from "react";
import { DiaryContext } from "../contexts/DiaryContext";
import RadioButtonGroup from "./RadioButtonGroup";
import {
  isNotEmpty,
  isRadioSelected,
  isFileSelected,
} from "../utils/validation";
import "../styles/DiaryForm.css";

const DiaryForm = ({ closeModal }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { type, files } = event.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const isFormValid =
      isFileSelected(fd.get("photo")) &&
      isRadioSelected(data.mood) &&
      isRadioSelected(data.activity) &&
      isRadioSelected(data.meal);

    if (!isFormValid) {
      setError(true);
      return;
    }

    console.log(data);

    setError(false);
    addDiaryEntry(data);
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
          onChange={handleChange}
          required
        />
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "8px" }}
          />
        )}
      </div>

      <RadioButtonGroup
        label="2. 오늘의 기분은 어땠나요? (필수)"
        name="mood"
        options={moodOptions}
        required
      />
      <RadioButtonGroup
        label="3. 오늘의 활동량은 어땠나요? (필수)"
        name="activity"
        options={activityOptions}
        required
      />
      <RadioButtonGroup
        label="4. 오늘의 식사는 어땠나요? (필수)"
        name="meal"
        options={mealOptions}
        required
      />

      {/* 나머지 폼 필드들... */}
      {error && (
        <div className="control-error">모든 필수 필드를 입력해주세요.</div>
      )}
      <div className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DiaryForm;
