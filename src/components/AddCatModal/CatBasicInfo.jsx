export default function CatBasicInfo({
  formData,
  handleChange,
  handleNextStep,
}) {
  return (
    <>
      <h2>고양이 추가 - 기본 정보</h2>
      <form>
        <label>
          이름:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="16자 이내로 작성해주세요"
          />
        </label>
        <label>
          품종:
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
          <button>품종 검색</button>
        </label>
        <label>
          출생일:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </label>
        <label>
          입양일:
          <input
            type="date"
            name="adoptionDate"
            value={formData.adoptionDate}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleNextStep}>
          다음
        </button>
      </form>
    </>
  );
}
