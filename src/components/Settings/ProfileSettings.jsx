import { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (cats.length === 0) {
      loadCats();
    }
  }, [loadCats, cats.length]);

  useEffect(() => {
    console.log("Cats:", cats); // cats 배열이 제대로 로드되는지 확인
    console.log("Selected Cat:", selectedCat); // 선택된 고양이 확인
  }, [cats, selectedCat]);

  const handleSelectChange = (e) => {
    const selectedCatId = Number(e.target.value);
    console.log("Selected Cat ID:", selectedCatId);
    const selectedCat = cats.find((cat) => cat.id === selectedCatId);
    if (selectedCat) {
      selectCat(selectedCat);
    } else {
      console.error(`Cat with id ${selectedCatId} not found`);
    }
  };

  const handleUpdateCat = (cat) => {
    // Update 로직을 여기에 추가
    updateCat(cat.id, { ...cat, name: "updated Cat" })
      .then(() => {
        console.log("Cat updated successfully");
      })
      .catch((error) => {
        console.error("Error updating cat:", error);
      });
  };

  const handleDeleteCat = (catId) => {
    // Delete 로직을 여기에 추가
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
          <button
            className="profile-settings-header__edit"
            onClick={() => handleUpdateCat(selectedCat)}
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
              <span>{selectedCat.name}</span>
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">품종:</label>
              <span>{selectedCat.breed}</span>
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">체중:</label>
              <span>{selectedCat.weight}</span>
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">성별:</label>
              <span>{selectedCat.gender}</span>
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">생일:</label>
              <span>{selectedCat.birthday}</span>
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">입양일:</label>
              <span>{selectedCat.adopted_day}</span>
            </li>
            <li className="profile-settings-content__li">
              <label className="profile-settings-content__label">중성화:</label>
              <span>{selectedCat.neutered ? "수술함" : "수술안함"}</span>
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
