import React, { useState, useContext } from "react";
import Select from "react-select";
import { CatContext } from "../contexts/CatContext";
import "../styles/Modal.css";
import breeds from "../data/breeds.json";

export default function AddCatModal({ closeModal }) {
  const [cat, setCat] = useState({
    name: "",
    age: "",
    breed: "",
    birthDate: "",
    adoptDate: "",
  });

  const { addCat } = useContext(CatContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCat((prevCat) => ({
      ...prevCat,
      [name]: value,
    }));
  };

  const handleBreedChange = (selectedOption) => {
    setCat((prevCat) => ({
      ...prevCat,
      breed: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCat(cat);
    closeModal();
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>새 친구의 정보를 입력해주세요.</h2>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              name="name"
              value={cat.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요."
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
          <button type="submit">저장</button>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
}
