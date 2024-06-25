export default function CatAdditionalInfo({
  catData,
  handleChange,
  handlePrevStep,
  handleNextStep,
}) {
  return (
    <>
      <h2>새 친구의 추가 정보를 입력해주세요.</h2>
      <div>
        <label htmlFor="gender">성별</label>
        <input
          type="radio"
          name="gender"
          value={catData.gender}
          onChange={handleChange}
          required
        />
        남아
        <input
          type="radio"
          name="gender"
          value={catData.gender}
          onChange={handleChange}
          required
        />
        여아
      </div>
      <div>
        <label htmlFor="neutered">중성화 수술을 받았나요?</label>
        <input
          type="radio"
          name="neutered"
          value={catData.neutered}
          onChange={handleChange}
          required
        />
        수술함
        <input
          type="radio"
          name="neutered"
          value={catData.neutered}
          onChange={handleChange}
          required
        />
        수술안함
      </div>
      <div>
        <label htmlFor="weight">체중</label>
        <input
          type="number"
          name="weight"
          value={catData.name}
          onChange={handleChange}
          placeholder="kg"
          required
        />
      </div>
      <div>
        <label htmlFor="photo">사진을 선택해주세요</label>
        <input
          type="file"
          name="photo"
          value={catData.photo}
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
