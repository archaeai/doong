import useModal from "../hooks/useModal";
import useCurrentDate from "../hooks/useCurrentDate";

import DiaryForm from "../components/DiaryForm";
import Modal from "../UI/Modal";

export default function DiaryPage() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const currentDate = useCurrentDate();

  return (
    <>
      <h1>{currentDate}</h1>
      <div className="page-content">
        <h1>Diary Page</h1>
        <button onClick={openModal}>일기를 추가해주세요</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DiaryForm closeModal={closeModal} />
        </Modal>
      </div>
    </>
  );
}
