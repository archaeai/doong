import { useContext, useState } from "react";
import { DiaryContext } from "../contexts/DiaryContext";
import RadioButton from "../UI/RadioButton";
import {
  isNotEmpty,
  isRadioSelected,
  isFileSelected,
} from "../utils/validation";
import useFilePreview from "../hooks/useFilePreview";
import "../styles/DiaryForm.css";

const DiaryForm = ({ closeModal }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  const { photoPreview, handleFilePreview } = useFilePreview();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newErrors = {};
    if (!isFileSelected(fd.get("photo")))
      newErrors.photo = "사진을 추가해주세요";
    if (!isRadioSelected(data.mood)) newErrors.mood = "기분을 선택해주세요";
    if (!isRadioSelected(data.activity))
      newErrors.activity = "활동량을 선택해주세요";
    if (!isRadioSelected(data.meal)) newErrors.meal = "식사량을 선택해주세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(data);

    setErrors({});
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
          onChange={handleFilePreview}
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
      />
      <RadioButton
        label="3. 오늘의 활동량은 어땠나요? (필수)"
        name="activity"
        options={activityOptions}
        error={errors.activity}
      />
      <RadioButton
        label="4. 오늘의 식사는 어땠나요? (필수)"
        name="meal"
        options={mealOptions}
        error={errors.meal}
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
