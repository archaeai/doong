import { useState, useContext } from "react";

import CatBasicInfo from "./CatBasicInfo";
import CatAdditionalInfo from "./CatAdditionalInfo";
import CatRoutainInfo from "./CatRoutineInfo";

import { CatContext } from "../../contexts/CatContext";
import "../../styles/Modal.css";

export default function AddCatModal({ closeModal }) {
  const [step, setStep] = useState(1);
  const { addCat } = useContext(CatContext);
  const [catData, setCatData] = useState({
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
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setCatData((prevCatData) => ({
        ...prevCatData,
        [name]: files[0],
      }));
    } else {
      setCatData((prevCatData) => ({
        ...prevCatData,
        [name]: value,
      }));
    }
  };

  const handleBreedChange = (selectedOption) => {
    setCatData((prevCatData) => ({
      ...prevCatData,
      breed: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCat(catData);
    closeModal();
    console.log(catData);
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <CatBasicInfo
              catData={catData}
              handleChange={handleChange}
              handleBreedChange={handleBreedChange}
              closeModal={closeModal}
              handleNextStep={handleNextStep}
            />
          )}
          {step === 2 && (
            <CatAdditionalInfo
              catData={catData}
              handleChange={handleChange}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
            />
          )}
          {step === 3 && (
            <CatRoutainInfo
              catData={catData}
              handleChange={handleChange}
              handlePrevStep={handlePrevStep}
              handleSubmit={handleSubmit}
            />
          )}
        </form>
      </div>
    </div>
  );
}
