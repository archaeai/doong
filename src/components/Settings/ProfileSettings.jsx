import { useContext, useEffect, useState } from "react";
import { CatContext } from "../../contexts/CatContext";
import defaultCatImg from "../../assets/cat-image.png";
import ProfileEditForm from "./ProfileEditForm";
import CatSelect from "../../UI/CatSelect";
import useFilePreview from "../../hooks/useFilePreview";

export default function ProfileSettings() {
  const {
    cats,
    selectedCat,
    isLoading,
    isError,
    errorMessage,
    selectCat,
    loadCats,
    updateCat,
    deleteCat,
  } = useContext(CatContext);
  const { photoPreview, handleFilePreview } = useFilePreview();
  const [isEditing, setIsEditing] = useState(false);
  const [editCat, setEditCat] = useState({});

  useEffect(() => {
    if (selectedCat) {
      setEditCat(selectedCat);
    }
  }, [selectedCat]);

  const handleUpdateCat = () => {
    updateCat(editCat.id, editCat)
      .then(() => {
        console.log("Cat updated successfully", editCat);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating cat:", error);
      });
  };

  const handleDeleteCat = (catId) => {
    deleteCat(catId)
      .then(() => {
        console.log("Cat deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting cat:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditCat(selectedCat);
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Loading cat profiles...</div>;
  }

  if (isError) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!isLoading && cats.length === 0) {
    return <div>No cat profiles available.</div>;
  }

  return (
    <div>
      <div className="profile-settings-header">
        <CatSelect />
        <div>
          {isEditing ? (
            <>
              <button
                className="profile-settings-header__edit"
                onClick={handleUpdateCat}
              >
                저장
              </button>
              <button
                className="profile-settings-header__delete"
                onClick={handleCancelEdit}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                className="profile-settings-header__edit"
                onClick={() => setIsEditing(true)}
                disabled={!selectedCat}
              >
                수정
              </button>
              <button
                className="profile-settings-header__delete"
                onClick={() => handleDeleteCat(selectedCat.id)}
                disabled={!selectedCat}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      {selectedCat ? (
        <section>
          <div className="profile-settings-content__heading">
            <img
              className="profile-settings-content__heading-img"
              src={
                photoPreview
                  ? photoPreview
                  : selectedCat.photo_url
                  ? `backend/${selectedCat.photo_url}`
                  : defaultCatImg
              }
              alt={selectedCat.name}
            />
            <h3>{selectedCat.name}</h3>
          </div>
          <ProfileEditForm
            cat={editCat}
            isEditing={isEditing}
            onChange={setEditCat}
            photoPreview={photoPreview}
            handleFilePreview={handleFilePreview}
          />
        </section>
      ) : (
        <section>
          <p>고양이를 선택해주세요.</p>
        </section>
      )}
    </div>
  );
}
