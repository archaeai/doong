import { useContext, useEffect } from "react";
import { CatContext } from "../contexts/CatContext";
import { DiaryContext } from "../contexts/DiaryContext";

import useModal from "../hooks/useModal";
import useCurrentDate from "../hooks/useCurrentDate";
import DiaryGrid from "../components/Diary/DiaryGrid";
import DiaryForm from "../components/Diary/DiaryForm";
import Modal from "../UI/Modal";
import diaryDefaultImg from "../assets/diary-default-image.png";
import CatSelect from "../UI/CatSelect";
import "../styles/Diary.css";

export default function DiaryPage() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const currentDate = useCurrentDate();
  const { selectedCat } = useContext(CatContext);
  const {
    fetchDiaryByCatAndDate,
    fetchDiariesByCat,
    diaryEntries,
    isLoading,
    isError,
  } = useContext(DiaryContext);

  useEffect(() => {
    if (selectedCat && currentDate) {
      fetchDiaryByCatAndDate(selectedCat.id, currentDate);
    }
  }, [selectedCat, currentDate]);

  return (
    <>
      <h1>{currentDate}</h1>
      <div className="page-content">
        <div className="diary-right-side">
          <h2 className="add-diary-heading" onClick={openModal}>
            일기쓰기
          </h2>
          <div className="diary-select-container">
            <CatSelect />
            <input type="date" name="adoptDate" className="diary-date-input" />
          </div>
          <div className="diary-illustration-area">
            <img
              src={diaryDefaultImg}
              alt="diary illustration"
              className="diary-illustration"
            />
            <p className="diary-name">{selectedCat.name}의 일기</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="diary-text-area">
          {isLoading ? (
            <p>다이어리 불러오는중...</p>
          ) : isError ? (
            <p>Error...</p>
          ) : (
            <DiaryGrid
              selectedCat={selectedCat}
              diaryData={diaryEntries[0] || null}
            />
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DiaryForm closeModal={closeModal} />
        </Modal>
      </div>
    </>
  );
}
