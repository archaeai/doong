export default function CatRoutainInfo({
  catData,
  handleChange,
  handlePrevStep,
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
      </label>
      <label>
        마지막 심장사상충 예방접종일:
        <input
          type="date"
          name="heartwormDate"
          value={catData.heartwormDate}
          onChange={handleChange}
        />
      </label>
      <label>
        마지막 전체모래갈이일:
        <input
          type="date"
          name="litterDate"
          value={catData.litterDate}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handlePrevStep}>
        이전
      </button>
      <button type="submit">저장</button>
    </>
  );
}
