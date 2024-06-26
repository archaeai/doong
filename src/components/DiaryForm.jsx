import { useContext, useState } from "react";
import { DiaryContext } from "../contexts/DiaryContext";
import "../styles/DiaryForm.css";

const DiaryForm = ({ closeModal }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.photo = fd.get("photo");

    if (!data.mood || !data.activity || !data.meal) {
      setError(true);
      return;
    }

    console.log(data);

    setError(false);
    addDiaryEntry(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
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

      <div className="form-group">
        <label>2. 오늘의 기분은 어땠나요? (필수)</label>
        <div className="radio-button-group">
          <input type="radio" id="happy" name="mood" value="행복" required />
          <label htmlFor="happy">행복</label>

          <input
            type="radio"
            id="stress"
            name="mood"
            value="스트레스"
            required
          />
          <label htmlFor="stress">스트레스</label>

          <input type="radio" id="anxious" name="mood" value="불안" required />
          <label htmlFor="anxious">불안</label>
        </div>
      </div>

      <div className="form-group">
        <label>3. 오늘의 활동량은 어땠나요? (필수)</label>
        <div className="radio-button-group">
          <input type="radio" id="high" name="activity" value="높음" required />
          <label htmlFor="high">높음</label>

          <input
            type="radio"
            id="medium"
            name="activity"
            value="보통"
            required
          />
          <label htmlFor="medium">보통</label>

          <input type="radio" id="low" name="activity" value="낮음" required />
          <label htmlFor="low">낮음</label>
        </div>
      </div>

      <div className="form-group">
        <label>4. 오늘의 식사는 어땠나요? (필수)</label>
        <div className="radio-button-group">
          <input type="radio" id="adequate" name="meal" value="적정" required />
          <label htmlFor="adequate">적정</label>

          <input
            type="radio"
            id="insufficient"
            name="meal"
            value="부족"
            required
          />
          <label htmlFor="insufficient">부족</label>

          <input type="radio" id="leftover" name="meal" value="남음" required />
          <label htmlFor="leftover">남음</label>
        </div>
      </div>

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
