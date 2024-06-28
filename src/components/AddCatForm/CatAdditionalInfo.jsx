import RadioButton from "../../UI/RadioButton";
import useFilePreview from "../../hooks/useFilePreview";

export default function CatAdditionalInfo({
  catData,
  handleChange,
  handlePrevStep,
  handleNextStep,
}) {
  const { photoPreview, handleFilePreview } = useFilePreview();

  const genderOptions = [
    { value: "male", label: "수컷" },
    { value: "female", label: "암컷" },
  ];

  const neuteredOptions = [
    { value: "yes", label: "수술함" },
    { value: "no", label: "수술안함" },
  ];

  const handleFileChange = (event) => {
    handleChange(event);
    handleFilePreview(event);
  };

  return (
    <>
      <h2>새 친구의 추가 정보를 입력해주세요.</h2>
      <RadioButton
        label="성별"
        name="gender"
        options={genderOptions}
        error={catData.genderError}
        onChange={handleChange}
        selectedValue={catData.gender}
      />
      <RadioButton
        label="중성화 수술을 받았나요?"
        name="neutered"
        options={neuteredOptions}
        error={catData.neuteredError}
        onChange={handleChange}
        selectedValue={catData.neutered}
      />
      <div>
        <label htmlFor="weight">체중</label>
        <input
          id="weight"
          type="number"
          name="weight"
          value={catData.weight}
          onChange={handleChange}
          step="0.1"
          required
        />
        <span>kg</span>
      </div>
      <div>
        <label htmlFor="photo">사진을 선택해주세요</label>
        <input
          id="photo"
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
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
      <button type="button" onClick={handlePrevStep}>
        이전
      </button>
      <button type="button" onClick={handleNextStep}>
        다음
      </button>
    </>
  );
}
