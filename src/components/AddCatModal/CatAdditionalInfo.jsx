export default function CatAdditionalInfo({
  catData,
  handleChange,
  handlePrevStep,
  handleNextStep,
}) {
  return (
    <>
      <h2>새 친구의 추가 정보를 입력해주세요.</h2>
      <fieldset>
        <legend>성별</legend>
        <div>
          <input
            id="male"
            type="radio"
            name="gender"
            value="male"
            checked={catData.gender === "male"}
            onChange={handleChange}
            required
          />
          <label htmlFor="male">수컷</label>
        </div>
        <div>
          <input
            id="female"
            type="radio"
            name="gender"
            value="female"
            checked={catData.gender === "female"}
            onChange={handleChange}
            required
          />
          <label htmlFor="female">암컷</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>중성화 수술을 받았나요?</legend>
        <div>
          <input
            id="yes"
            type="radio"
            name="neutered"
            value="yes"
            checked={catData.neutered === "yes"}
            onChange={handleChange}
            required
          />
          <label htmlFor="yes">수술함</label>
        </div>
        <div>
          <input
            id="no"
            type="radio"
            name="neutered"
            value="no"
            checked={catData.neutered === "no"}
            onChange={handleChange}
            required
          />
          <label htmlFor="no">수술안함</label>
        </div>
      </fieldset>
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
          onChange={handleChange}
          required
        />
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
