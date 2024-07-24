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
  neutered: null,
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

  const handleAddCat = (data) => {
    try {
      const newCat = addCat(data);
      resetForm();
      closeModal();
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
