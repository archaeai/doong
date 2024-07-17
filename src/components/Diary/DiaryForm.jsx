import { useContext } from "react";
import useFormState from "../../hooks/useFormState";
import { DiaryContext } from "../../contexts/DiaryContext";
import RadioButton from "../../UI/RadioButton";
import { validateDiaryForm } from "../../utils/validation";
import {
  moodOptions,
  activityOptions,
  mealOptions,
  poopCountOptions,
  poopTypeOptions,
  peeCountOptions,
  peeSizeOptions,
  symptomOptions,
} from "../../utils/formOptions";
import "../../styles/DiaryForm.css";

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
      poopCount: "",
      poopType: "",
      peeCount: "",
      peeSize: "",
      symptoms: "",
      symptomsDetails: "",
      environmentDetails: "",
      notes: "",
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
      <div className="form-group">
        <label>5. 오늘 등의 배변 상태를 기록해주세요. (선택)</label>
        <div>
          <p>맛동산</p>
          <RadioButton
            label="갯수"
            name="poopCount"
            options={poopCountOptions}
            error={errors.poopCount}
            onChange={handleChange}
            selectedValue={diaryData.poopCount}
          />
          <RadioButton
            label="상태"
            name="poopType"
            options={poopTypeOptions}
            error={errors.poopType}
            onChange={handleChange}
            selectedValue={diaryData.poopType}
          />
        </div>
        <div>
          <p>감자</p>
          <RadioButton
            label="갯수"
            name="peeCount"
            options={peeCountOptions}
            error={errors.peeCount}
            onChange={handleChange}
            selectedValue={diaryData.peeCount}
          />
          <RadioButton
            label="크기"
            name="peeSize"
            options={peeSizeOptions}
            error={errors.peeSize}
            onChange={handleChange}
            selectedValue={diaryData.peeSize}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="symptomsDetails">
          6. 오늘 등의 이상 증상을 기록해주세요. (선택)
        </label>
        <RadioButton
          label="증상"
          name="symptoms"
          options={symptomOptions}
          error={errors.symptoms}
          onChange={handleChange}
          selectedValue={diaryData.symptoms}
        />
        <input
          id="symptomsDetails"
          type="text"
          name="symptomsDetails"
          placeholder="색깔 등 상세 내용을 적어주세요"
          value={diaryData.symptomsDetails}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="environmentDetails">
          7. 오늘 등의 환경 변화를 기록해주세요. (선택)
        </label>
        <input
          id="environmentDetails"
          type="text"
          name="environmentDetails"
          placeholder="캣타워 교체, 손님 맞이 등 자유롭게 적어주세요."
          value={diaryData.environmentDetails}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">
          8. 오늘 남기고 싶은 이야기를 기록해주세요.(선택)
        </label>
        <textarea
          id="notes"
          name="notes"
          placeholder="예) 오늘 둥이가 처음으로 골골송을 불렀다!"
          value={diaryData.notes || ""}
          onChange={handleChange}
          rows={4}
        />
      </div>
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
