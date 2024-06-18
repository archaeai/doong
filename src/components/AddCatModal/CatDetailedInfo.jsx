import React from "react";

export default function CatDetailedInfo({
  formData,
  handleChange,
  handleFileChange,
  handleNextStep,
  handlePrevStep,
}) {
  return (
    <>
      <h2>고양이 추가 - 세부 정보</h2>
      <form>
        <label>
          성별:
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />{" "}
          여아
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />{" "}
          남아
        </label>
        <label>
          중성화 수술:
          <input
            type="radio"
            name="neutered"
            value="yes"
            checked={formData.neutered === "yes"}
            onChange={handleChange}
          />{" "}
          수술함
          <input
            type="radio"
            name="neutered"
            value="no"
            checked={formData.neutered === "no"}
            onChange={handleChange}
          />{" "}
          수술안함
        </label>
        <label>
          체중:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="kg"
          />
        </label>
        <label>
          사진:
          <input type="file" name="photo" onChange={handleFileChange} />
        </label>
        <button type="button" onClick={handlePrevStep}>
          이전
        </button>
        <button type="button" onClick={handleNextStep}>
          다음
        </button>
      </form>
    </>
  );
}
