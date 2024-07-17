import RadioButton from "../../UI/RadioButton";
import {
  genderOptions,
  neuteredOptions,
  stickerOptions,
} from "../../utils/formOptions";

export default function CatAdditionalInfo({
  catData,
  handleChange,
  handleStickerChange,
  handlePrevStep,
  handleNextStep,
  photoPreview,
  errors,
}) {
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
        {errors.gender && <p className="control-error">{errors.gender}</p>}
      </div>
      <div>
        <RadioButton
          label="중성화 수술을 받았나요?"
          name="neutered"
          options={neuteredOptions}
          onChange={handleChange}
          selectedValue={String(catData.neutered)}
        />
        {errors.neutered && <p className="control-error">{errors.neutered}</p>}
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
        {errors.weight && <p className="control-error">{errors.weight}</p>}
      </div>
      <div>
        <label htmlFor="photo">사진을 선택해주세요</label>
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
        {errors.photo && <p className="control-error">{errors.photo}</p>}
      </div>
      <RadioButton
        label="스티커를 선택해주세요"
        name="sticker"
        options={stickerOptions}
        onChange={handleStickerChange}
        selectedValue={catData.sticker}
      />
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
