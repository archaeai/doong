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
  neutered: true,
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
    const params = new URLSearchParams({
      name: data.name,
      breed: data.breed,
      gender: data.gender,
      birthday: data.birthDate,
      adopted_day: data.adoptDate,
      vaccine_date: data.vaccinationDate,
      heart_warm_date: data.heartwormDate,
      litter_date: data.litterDate,
      neutered: data.neutered,
      weight: data.weight,
    });
    const formData = new FormData();
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    try {
      const response = await fetch(
        `http://127.0.0.1/api/cat_profiles/?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Network response was not ok");
      }

      const newCat = await response.json();
      addCat(newCat);
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
