import { useContext, useEffect, useState } from "react";
import {
  fetchCatProfiles,
  updateCatProfile,
  deleteCatProfile,
} from "../../api/catApi";
import { CatContext } from "../../contexts/CatContext";
import catImg from "../../assets/cat-image.png";

export default function ProfileSettings() {
  const { cats, selectCat, selectedCat, addCat } = useContext(CatContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCatProfiles();
        data.forEach((cat) => addCat(cat));
      } catch (error) {
        console.error("Error fetching cat profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [addCat]);

  const handleDelete = async (catId) => {
    try {
      await deleteCatProfile(catId);
      selectCat(null); // 선택된 고양이를 초기화
      window.location.reload(); // 페이지를 새로 고침
    } catch (error) {
      console.error("Error deleting cat profile:", error);
    }
  };

  const handleUpdate = async (updatedCat) => {
    try {
      await updateCatProfile(updatedCat.id, updatedCat);
      window.location.reload(); // 페이지를 새로 고침
    } catch (error) {
      console.error("Error updating cat profile:", error);
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <div className="profile-settings-header">
        <select
          className="profile-settings-header__select"
          onChange={(e) =>
            selectCat(cats.find((cat) => cat.id === e.target.value))
          }
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
            onClick={() => handleUpdate(selectedCat)}
          >
            수정
          </button>
          <button
            className="profile-settings-header__delete"
            onClick={() => handleDelete(selectedCat.id)}
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
