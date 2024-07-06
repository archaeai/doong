import { useEffect, useContext } from "react";
import { CatContext } from "../../contexts/CatContext";
import useFormState from "../../hooks/useFormState";
import { validateCatForm } from "../../utils/validation";
import Modal from "../../UI/Modal";
import CatBasicInfo from "./CatBasicInfo";
import CatAdditionalInfo from "./CatAdditionalInfo";
import CatRoutainInfo from "./CatRoutineInfo";
import "../../styles/Modal.css";

const initialState = {
  name: "",
  breed: "",
  birthDate: "",
  adoptDate: "",
  gender: "",
  neutered: "",
  weight: "",
  photo: null,
  vaccinationDate: "",
  heartwormDate: "",
  litterDate: "",
};

export default function AddCatForm({ isOpen, closeModal }) {
  const { addCat } = useContext(CatContext);
  const {
    formData: catData,
    handleChange,
    handleSelectChange,
    step,
    resetForm,
    errors,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    photoPreview,
  } = useFormState(initialState, validateCatForm);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleAddCat = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("birthday", data.birthDate);
    formData.append("weight", data.weight);
    formData.append("user_id", data.user_id); // 현재 사용자 ID 추가
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    try {
      const response = await fetch("http://127.0.0.1/api/cat_profiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 필요한 경우 토큰 추가
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newCat = await response.json();
      addCat(newCat); // 고양이 추가 컨텍스트 업데이트
      resetForm(); // 폼 리셋
      closeModal(); // 모달 닫기
      console.log("Submitted Data:", data);
    } catch (error) {
      console.error("Error adding cat:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <form onSubmit={(event) => handleSubmit(event, handleAddCat)} noValidate>
        {step === 1 && (
          <CatBasicInfo
            catData={catData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            closeModal={closeModal}
            handleNextStep={handleNextStep}
            errors={errors}
          />
        )}
        {step === 2 && (
          <CatAdditionalInfo
            catData={catData}
            handleChange={handleChange}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
            photoPreview={photoPreview}
            errors={errors}
          />
        )}
        {step === 3 && (
          <CatRoutainInfo
            catData={catData}
            handleChange={handleChange}
            handlePrevStep={handlePrevStep}
            errors={errors}
          />
        )}
      </form>
    </Modal>
  );
}
