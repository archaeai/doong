import { useContext, useEffect, useState } from "react";
import { CatContext } from "../../contexts/CatContext";
import catImg from "../../assets/cat-image.png";

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
  const [editCat, setEditCat] = useState(selectCat || {});

  useEffect(() => {
    if (cats.length === 0) {
      loadCats();
    }
  }, [loadCats, cats.length]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCat((prevCat) => ({ ...prevCat, [name]: value }));
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
              className="profile-settings-header__save"
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
              src={selectedCat.photo || catImg}
              alt={selectedCat.name}
            />
            <h3>{selectedCat.name}</h3>
          </div>
          {!selectedCat.neutered && <p>중성화가 필요해요!</p>}
          <ul className="profile-settings-content__ul">
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">이름:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editCat.name}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{selectedCat.name}</span>
              )}
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">품종:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="breed"
                  value={editCat.breed}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{selectedCat.breed}</span>
              )}
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">체중:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="weight"
                  value={editCat.weight}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{selectedCat.weight}</span>
              )}
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">성별:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gender"
                  value={editCat.gender}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{selectedCat.gender}</span>
              )}
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">생일:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthday"
                  value={editCat.birthday}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{selectedCat.birthday}</span>
              )}
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">입양일:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="adopted_day"
                  value={editCat.adopted_day}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{selectedCat.adopted_day}</span>
              )}
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">중성화:</label>
              {isEditing ? (
                <input
                  type="checkbox"
                  name="neutered"
                  checked={editCat.neutered}
                  onChange={(e) =>
                    setEditCat((prevCat) => ({
                      ...prevCat,
                      neutered: e.target.checked,
                    }))
                  }
                />
              ) : (
                <span>{selectedCat.neutered ? "수술함" : "수술안함"}</span>
              )}
            </li>
          </ul>
        </section>
      ) : (
        <section>
          <p>고양이를 선택해주세요.</p>
        </section>
      )}
    </div>
  );
}
