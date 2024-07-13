import { useContext, useEffect, useState } from "react";
import { CatContext } from "../../contexts/CatContext";
import catImg from "../../assets/cat-image.png";
import ProfileEditForm from "./ProfileEditForm";

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

  const [isEditing, setIsEditing] = useState(false);
  const [editCat, setEditCat] = useState({});

  useEffect(() => {
    if (cats.length === 0) {
      loadCats();
    } else if (!selectedCat && cats.length > 0) {
      selectCat(cats[0]);
    }
  }, [loadCats, cats.length, selectedCat, selectCat, cats]);

  useEffect(() => {
    if (selectedCat) {
      setEditCat(selectedCat);
    }
  }, [selectedCat]);

  const handleSelectChange = (e) => {
    const selectedCatId = Number(e.target.value);
    const selectedCat = cats.find((cat) => cat.id === selectedCatId);
    if (selectedCat) {
      selectCat(selectedCat);
    } else {
      console.error(`Cat with id ${selectedCatId} not found`);
    }
  };

  const handleUpdateCat = () => {
    updateCat(editCat.id, editCat)
      .then(() => {
        console.log("Cat updated successfully");
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
        <select
          className="profile-settings-header__select"
          onChange={handleSelectChange}
          value={selectedCat ? selectedCat.id : ""}
        >
          <option value="" disabled>
            고양이 선택
          </option>
          {cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <div>
          {isEditing ? (
            <button
              className="profile-settings-header__edit"
              onClick={handleUpdateCat}
            >
              저장
            </button>
          ) : (
            <button
              className="profile-settings-header__edit"
              onClick={() => setIsEditing(true)}
              disabled={!selectedCat}
            >
              수정
            </button>
          )}
          <button
            className="profile-settings-header__delete"
            onClick={() => handleDeleteCat(selectedCat.id)}
            disabled={!selectedCat}
          >
            삭제
          </button>
        </div>
      </div>
      {selectedCat ? (
        <section>
          <div className="profile-settings-content__heading">
            <img
              className="profile-settings-content__heading-img"
              src={
                selectedCat.photo_url
                  ? `backend/${selectedCat.photo_url}`
                  : catImg
              }
              alt={selectedCat.name}
            />
            <h3>{selectedCat.name}</h3>
          </div>
          <ProfileEditForm
            cat={editCat}
            isEditing={isEditing}
            onChange={setEditCat}
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
