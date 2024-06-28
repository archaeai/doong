import Select from "react-select";
import breeds from "../../data/breeds.json";

export default function CatBasicInfo({
  catData,
  handleChange,
  handleSelectChange,
  closeModal,
  handleNextStep,
}) {
  return (
    <>
      <h2>새 친구의 기본 정보를 입력해주세요.</h2>
      <div>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          name="name"
          value={catData.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요."
          required
        />
      </div>
      <div>
        <label htmlFor="breed">품종</label>
        <Select
          id="breed"
          name="breed"
          options={breeds}
          value={breeds.find((option) => option.value === catData.breed)}
          onChange={handleSelectChange}
          placeholder="품종을 검색하세요."
          required
        />
      </div>
      <div>
        <label htmlFor="birthDate">출생일</label>
        <input
          id="birthDate"
          type="date"
          name="birthDate"
          value={catData.birthDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="adoptDate">입양일</label>
        <input
          id="adoptDate"
          type="date"
          name="adoptDate"
          value={catData.adoptDate}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={closeModal}>
        닫기
      </button>
      <button type="button" onClick={handleNextStep}>
        다음
      </button>
    </>
  );
}
