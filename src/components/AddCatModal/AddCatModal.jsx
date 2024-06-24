import { useState, useContext } from "react";

import { CatContext } from "../../contexts/CatContext";
import "../../styles/Modal.css";
import CatBasicInfo from "./CatBasicInfo";

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
          <CatBasicInfo
            cat={cat}
            handleChange={handleChange}
            handleBreedChange={handleBreedChange}
          />
          <button type="submit">저장</button>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
}
