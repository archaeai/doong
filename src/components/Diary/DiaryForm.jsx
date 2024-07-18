import { useContext } from "react";
import useFormState from "../../hooks/useFormState";
import { DiaryContext } from "../../contexts/DiaryContext";
import RadioButton from "../../UI/RadioButton";
import { getCurrentLocalISODateString } from "../../utils/dateUtil";
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

const DiaryForm = ({ closeModal, selectedCat }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  const {
    formData: diaryData,
    handleChange,
    handleSubmit,
    errors,
    photoPreview,
  } = useFormState(
    {
      photo_url: null,
      date: getCurrentLocalISODateString(),
      cat_id: selectedCat.id,
      mood: "",
      activity_level: "",
      portion_status: "",
      sweet_potato_num: "",
      sweet_potato_cond: "",
      potato_num: "",
      potato_cond: "",
      weight: 0,
      abnormal_act: "",
      abnormal_detail: "",
      note: "",
      comment: "",
    },
    validateDiaryForm
  );

  const submitForm = async (diaryData) => {
    try {
      await addDiaryEntry(diaryData);
      console.log("Submitted Data:", diaryData);
      closeModal();
    } catch (error) {
      console.error("Failed to submit the diary entry:", error);
    }
  };

  // const submitForm = async (data) => {
  //   const formData = new FormData();
  //   for (const key in data) {
  //     if (key === "photo") {
  //       formData.append("photo", data[key]);
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }
  //   await addDiaryEntry(formData);
  //   closeModal();
  //   console.log("Submitted Data:", formData, data.photo);
  //   // closeModal();
  //   // console.log("Submitted Data:", data);
  // };

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
          name="photo_url"
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
        name="activity_level"
        options={activityOptions}
        error={errors.activity}
        onChange={handleChange}
        selectedValue={diaryData.activity_level}
      />
      <RadioButton
        label="4. 오늘의 식사는 어땠나요? (필수)"
        name="portion_status"
        options={mealOptions}
        error={errors.meal}
        onChange={handleChange}
        selectedValue={diaryData.portion_status}
      />
      <div className="form-group">
        <label>5. 오늘 배변 상태를 기록해주세요. (선택)</label>
        <div>
          <p>맛동산</p>
          <RadioButton
            label="갯수"
            name="sweet_potato_num"
            options={poopCountOptions}
            error={errors.poopCount}
            onChange={handleChange}
            selectedValue={diaryData.sweet_potato_num}
          />
          <RadioButton
            label="상태"
            name="sweet_potato_cond"
            options={poopTypeOptions}
            error={errors.poopType}
            onChange={handleChange}
            selectedValue={diaryData.sweet_potato_cond}
          />
        </div>
        <div>
          <p>감자</p>
          <RadioButton
            label="갯수"
            name="potato_num"
            options={peeCountOptions}
            error={errors.peeCount}
            onChange={handleChange}
            selectedValue={diaryData.potato_num}
          />
          <RadioButton
            label="크기"
            name="potato_cond"
            options={peeSizeOptions}
            error={errors.peeSize}
            onChange={handleChange}
            selectedValue={diaryData.potato_cond}
          />
        </div>
      </div>
      <div>
        <label>6. 오늘의 체중을 기록해주세요. (선택)</label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={diaryData.weight}
        />
      </div>
      <div className="form-group">
        <label htmlFor="symptomsDetails">
          7. 오늘 이상증상이 있었다면 기록해주세요. (선택)
        </label>
        <RadioButton
          label="증상"
          name="abnomal_act"
          options={symptomOptions}
          error={errors.symptoms}
          onChange={handleChange}
          selectedValue={diaryData.abnomal_act}
        />
        <input
          id="symptomsDetails"
          type="text"
          name="abnomal_detail"
          placeholder="색깔 등 상세 내용을 적어주세요"
          value={diaryData.abnomal_detail}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="environmentDetails">
          8. 오늘 환경 변화를 기록해주세요. (선택)
        </label>
        <input
          id="environmentDetails"
          type="text"
          name="note"
          placeholder="캣타워 교체, 손님 맞이 등 자유롭게 적어주세요."
          value={diaryData.note}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">
          9. 오늘 남기고 싶은 이야기를 기록해주세요.(선택)
        </label>
        <textarea
          id="notes"
          name="comment"
          placeholder="예) 오늘 둥이가 처음으로 골골송을 불렀다!"
          value={diaryData.comment || ""}
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
