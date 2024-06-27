import useModal from "../hooks/useModal";

import DiaryForm from "../components/DiaryForm";
import Modal from "../UI/Modal";

export default function DiaryPage() {
  const { isModalOpen, openModal, closeModal } = useModal();

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
