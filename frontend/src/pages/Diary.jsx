import { useContext, useState, useEffect } from "react";
import { CatContext } from "../contexts/CatContext";
import { DiaryContext } from "../contexts/DiaryContext";

import useModal from "../hooks/useModal";
import DiaryGrid from "../components/Diary/DiaryGrid";
import DiaryForm from "../components/Diary/DiaryForm";
import {
  formatServerDateWithoutYear,
  getFormattedCurrentDate,
  getCurrentLocalISODateString,
} from "../utils/dateUtil";
import Modal from "../UI/Modal";
import CatSelect from "../UI/CatSelect";
import diaryDefaultImg from "../assets/diary-default-image.png";
import "../styles/Diary.css";

export default function DiaryPage() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { selectedCat } = useContext(CatContext);
  const { fetchDiaryByCatAndDate, diaryEntries, isLoading, isError } =
    useContext(DiaryContext);
  const [selectedDate, setSelectedDate] = useState(
    getCurrentLocalISODateString()
  );

  useEffect(() => {
    if (selectedCat && selectedDate) {
      fetchDiaryByCatAndDate(selectedCat.id, selectedDate);
    }
  }, [selectedCat, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <h1>{getFormattedCurrentDate()}</h1>
      <div className="page-content">
        <div className="diary-right-side">
          <h2 className="add-diary-heading" onClick={openModal}>
            일기쓰기
          </h2>
          <div className="diary-select-container">
            <CatSelect />
            <input
              type="date"
              name="adoptDate"
              className="diary-date-input"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="diary-illustration-area">
            <img
              src={
                selectedCat && diaryEntries[0]
                  ? `${diaryEntries[0].photo_url}`
                  : diaryDefaultImg
              }
              alt="diary illustration"
              className="diary-illustration"
            />
            <p className="diary-name">
              {selectedCat && diaryEntries[0]
                ? `${formatServerDateWithoutYear(diaryEntries[0].date)} ${
                    selectedCat.name
                  }의 일기`
                : "다른 날짜를 선택해주세요"}
            </p>
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
          <DiaryForm closeModal={closeModal} selectedCat={selectedCat} />
        </Modal>
      </div>
    </>
  );
}
