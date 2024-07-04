import RadioButton from "../../UI/RadioButton";
import { genderOptions, neuteredOptions } from "../../utils/formOptions";

export default function CatAdditionalInfo({
  catData,
  handleChange,
  handlePrevStep,
  handleNextStep,
  photoPreview,
  errors,
}) {
  const handleFileChange = (event) => {
    handleChange(event);
    handleFilePreview(event);
  };

  return (
    <>
      <h2>새 친구의 추가 정보를 입력해주세요.</h2>
      <div>
        <RadioButton
          label="성별"
          name="gender"
          options={genderOptions}
          onChange={handleChange}
          selectedValue={catData.gender}
        />
        {errors.gender && <p>{errors.gender}</p>}
      </div>
      <div>
        <RadioButton
          label="중성화 수술을 받았나요?"
          name="neutered"
          options={neuteredOptions}
          onChange={handleChange}
          selectedValue={catData.neutered}
        />
        {errors.neutered && <p>{errors.neutered}</p>}
      </div>
      <div>
        <label htmlFor="weight">체중 (kg)</label>
        <input
          id="weight"
          type="number"
          name="weight"
          value={catData.weight}
          onChange={handleChange}
          step="0.1"
          required
        />
        {errors.weight && <p>{errors.weight}</p>}
      </div>
      <div>
        <label htmlFor="weight">사진을 선택해주세요</label>
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
        {errors.photo && <p>{errors.photo}</p>}
      </div>
      <div className="add-cat-form-button-container">
        <button type="button" onClick={handlePrevStep}>
          이전
        </button>
        <button type="button" onClick={handleNextStep}>
          다음
        </button>
      </div>
    </>
  );
}
