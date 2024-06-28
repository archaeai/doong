export default function CatRoutainInfo({
  catData,
  handleChange,
  handlePrevStep,
  errors,
}) {
  return (
    <>
      <h2>루틴관리를 위한 정보를 입력해주세요</h2>
      <label>
        마지막 종합접종일:
        <input
          type="date"
          name="vaccinationDate"
          value={catData.vaccinationDate}
          onChange={handleChange}
        />
        {errors.vaccinationDate && <p>{errors.vaccinationDate}</p>}
      </label>
      <label>
        마지막 심장사상충 예방접종일:
        <input
          type="date"
          name="heartwormDate"
          value={catData.heartwormDate}
          onChange={handleChange}
        />
        {errors.heartwormDate && <p>{errors.heartwormDate}</p>}
      </label>
      <label>
        마지막 전체모래갈이일:
        <input
          type="date"
          name="litterDate"
          value={catData.litterDate}
          onChange={handleChange}
        />
        {errors.litterDate && <p>{errors.litterDate}</p>}
      </label>
      <button type="button" onClick={handlePrevStep}>
        이전
      </button>
      <button type="submit">저장</button>
    </>
  );
}
