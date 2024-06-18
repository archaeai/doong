import React, { useState } from "react";
import CatBasicInfo from "./CatBasicInfo";
import CatDetailedInfo from "./CatDetailedInfo";
import CatRoutainInfo from "./CatRoutineInfo";
import "./AddCatModal.css";

const AddCatModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    birthDate: "",
    adoptionDate: "",
    gender: "",
    neutered: "",
    weight: "",
    photo: null,
    vaccinationDate: "",
    heartwormDate: "",
    fleaDate: "",
    dentalDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // 여기에 폼 제출 로직 추가
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {step === 1 && (
          <CatBasicInfo
            formData={formData}
            handleChange={handleChange}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <CatDetailedInfo
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 3 && (
          <CatRoutainInfo
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handlePrevStep={handlePrevStep}
          />
        )}
      </div>
    </div>
  );
};

export default AddCatModal;
