import Select from "react-select";
import breeds from "../../data/breeds.json";

export default function CatBasicInfo({ cat, handleChange, handleBreedChange }) {
  return (
    <>
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          value={cat.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요."
          required
        />
      </div>
      <div>
        <label htmlFor="breed">품종</label>
        <Select
          name="breed"
          options={breeds}
          value={breeds.find((option) => option.value === cat.breed)}
          onChange={handleBreedChange}
          placeholder="품종을 검색하세요."
          required
        />
      </div>
      <div>
        <label htmlFor="birthDate">출생일</label>
        <input
          type="date"
          name="birthDate"
          value={cat.birthDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="adoptDate">입양일</label>
        <input
          type="date"
          name="adoptDate"
          value={cat.adoptDate}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
