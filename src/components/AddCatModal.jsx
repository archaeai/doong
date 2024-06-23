import React, { useState, useContext } from "react";
import { CatContext } from "../contexts/CatContext";
import "../styles/Modal.css";

export default function AddCatModal({ closeModal }) {
  const [cat, setCat] = useState({ name: "", age: "", breed: "" });
  const { addCat } = useContext(CatContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    new FormData();
    // addCat(cat);
    // closeModal();
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>새 고양이 친구의 정보를 입력해주세요.</h2>
          <div>
            <label htmlFor="name">이름</label>
            <input type="text" name="name" placeholder="이름을 입력하세요." />
          </div>
          <div>
            <label htmlFor="breed">품종</label>
            <input type="text" name="breed" placeholder="품종을 입력하세요." />
          </div>
          <div>
            <label htmlFor="">출생일</label>
            <input type="date" name="breed" placeholder="품종을 입력하세요." />
          </div>
          <div>
            <label htmlFor="">입양일</label>
            <input type="date" name="breed" placeholder="품종을 입력하세요." />
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
