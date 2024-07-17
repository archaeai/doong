import { useContext, useEffect } from "react";
import { CatContext } from "../contexts/CatContext";
import { DiaryContext } from "../contexts/DiaryContext";

import useModal from "../hooks/useModal";
import useCurrentDate from "../hooks/useCurrentDate";

import DiaryForm from "../components/DiaryForm";
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
    if (selectedCat) {
      fetchDiariesByCat(selectedCat.id);
    }
  }, [selectedCat]);

  // useEffect(() => {
  //   if (selectedCat) {
  //     fetchDiaryByCatAndDate(selectedCat.id, currentDate);
  //   }
  // }, []);

  return (
    <>
      <h1>{currentDate}</h1>
      <div className="page-content">
        <div className="diary-right-side">
          <h2 className="add-diary-heading" onClick={openModal}>
            일기쓰기
          </h2>
          <CatSelect />
          <input type="date" name="adoptDate" />
          <div className="diary-illustration-area">
            <img
              src={diaryDefaultImg}
              alt="diary illustration"
              className="diary-illustration"
            />
            <p>오늘의 둥이</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="diary-text-area">
          <p className="no-diary-message">아직 작성된 일기가 없습니다.</p>
          <br />
          <p>오늘의 일기를 작성해 보세요!</p>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DiaryForm closeModal={closeModal} />
        </Modal>
      </div>
    </>
  );
}
