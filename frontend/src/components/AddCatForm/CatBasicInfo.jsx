import Select from "react-select";
import breeds from "../../data/breeds.json";

export default function CatBasicInfo({
  catData,
  handleChange,
  handleSelectChange,
  closeModal,
  handleNextStep,
  errors,
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
        {errors.name && <p className="control-error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="breed">품종</label>
        <Select
          unstyled
          className="react-select-container"
          classNamePrefix="react-select"
          id="breed"
          name="breed"
          options={breeds}
          value={breeds.find((option) => option.value === catData.breed)}
          onChange={handleSelectChange}
          placeholder="품종을 검색하세요."
          required
        />
        {errors.breed && <p className="control-error">{errors.breed}</p>}
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
        {errors.birthDate && (
          <p className="control-error">{errors.birthDate}</p>
        )}
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
        {errors.adoptDate && (
          <p className="control-error">{errors.adoptDate}</p>
        )}
      </div>
      <div className="add-cat-form-button-container">
        <button type="button" onClick={closeModal}>
          닫기
        </button>
        <button type="button" onClick={handleNextStep}>
          다음
        </button>
      </div>
    </>
  );
}
