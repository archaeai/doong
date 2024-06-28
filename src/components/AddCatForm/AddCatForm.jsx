import { useState, useEffect, useContext } from "react";
import { CatContext } from "../../contexts/CatContext";
import useFormState from "../../hooks/useFormState";
import useFormValidation from "../../hooks/useFormValidation";
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
  const [step, setStep] = useState(1);
  const { addCat } = useContext(CatContext);
  const {
    formData: catData,
    handleChange,
    handleSelectChange,
    setFormData,
  } = useFormState({ initialState });

  const { errors, runValidation } = useFormValidation({}, (formData) =>
    validateCatForm(formData, step)
  );

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 폼 초기화
      setFormData(initialState);
      setStep(1);
    }
  }, [isOpen, setFormData, initialState]);

  const handleNextStep = () => {
    console.log("Cat Data:", catData);
    const newErrors = runValidation(catData);
    console.log("New Errors:", newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setStep((prevStep) => {
      console.log("Step updated:", prevStep + 1); // 추가 로그
      return prevStep + 1;
    });
  };
  const handlePrevStep = () => setStep(step - 1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = runValidation(catData);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addCat(catData);
    closeModal();
    console.log("Submitted Data:", catData);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit} noValidate>
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
            errors={errors}
          />
        )}
        {step === 3 && (
          <CatRoutainInfo
            catData={catData}
            handleChange={handleChange}
            handlePrevStep={handlePrevStep}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        )}
      </form>
    </Modal>
  );
}
