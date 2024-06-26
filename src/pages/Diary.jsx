import { useState } from "react";
import DiaryForm from "../components/DiaryForm";
import Modal from "../UI/Modal";

export default function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Diary Page</h1>
      <button onClick={openModal}>일기를 추가해주세요</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DiaryForm closeModal={closeModal} />
      </Modal>
    </>
  );
}
