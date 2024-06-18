import React from "react";

export default function CatRoutainInfo({
  formData,
  handleChange,
  handleSubmit,
  handlePrevStep,
}) {
  return (
    <>
      <h2>고양이 추가 - 루틴 관리</h2>
      <form onSubmit={handleSubmit}>
        <label>
          마지막 종합접종일:
          <input
            type="date"
            name="vaccinationDate"
            value={formData.vaccinationDate}
            onChange={handleChange}
          />
        </label>
        <label>
          마지막 심장사상충 예방접종일:
          <input
            type="date"
            name="heartwormDate"
            value={formData.heartwormDate}
            onChange={handleChange}
          />
        </label>
        <label>
          마지막 전체모래갈이일:
          <input
            type="date"
            name="fleaDate"
            value={formData.fleaDate}
            onChange={handleChange}
          />
        </label>
        <label>
          마지막 발톱 정리일:
          <input
            type="date"
            name="dentalDate"
            value={formData.dentalDate}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handlePrevStep}>
          이전
        </button>
        <button type="submit">완료</button>
      </form>
    </>
  );
}
