import React from "react";

export default function ProfileEditForm({ cat = {}, isEditing, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange((prevCat) => ({ ...prevCat, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange((prevCat) => ({ ...prevCat, [name]: checked }));
  };

  return (
    <ul className="profile-settings-content__ul">
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">이름:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={cat.name}
            onChange={handleInputChange}
          />
        ) : (
          <span>{cat.name}</span>
        )}
      </li>
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">품종:</label>
        {isEditing ? (
          <input
            type="text"
            name="breed"
            value={cat.breed}
            onChange={handleInputChange}
          />
        ) : (
          <span>{cat.breed}</span>
        )}
      </li>
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">체중:</label>
        {isEditing ? (
          <input
            type="text"
            name="weight"
            value={cat.weight}
            onChange={handleInputChange}
          />
        ) : (
          <span>{cat.weight}</span>
        )}
      </li>
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">성별:</label>
        {isEditing ? (
          <input
            type="text"
            name="gender"
            value={cat.gender}
            onChange={handleInputChange}
          />
        ) : (
          <span>{cat.gender}</span>
        )}
      </li>
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">생일:</label>
        {isEditing ? (
          <input
            type="date"
            name="birthday"
            value={cat.birthday}
            onChange={handleInputChange}
          />
        ) : (
          <span>{cat.birthday}</span>
        )}
      </li>
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">입양일:</label>
        {isEditing ? (
          <input
            type="date"
            name="adopted_day"
            value={cat.adopted_day}
            onChange={handleInputChange}
          />
        ) : (
          <span>{cat.adopted_day}</span>
        )}
      </li>
      <li className="profile-settings-content__li">
        <label className="profile-settings-content__label">중성화:</label>
        {isEditing ? (
          <input
            type="checkbox"
            name="neutered"
            checked={cat.neutered}
            onChange={handleCheckboxChange}
          />
        ) : (
          <span>{cat.neutered ? "수술함" : "수술안함"}</span>
        )}
      </li>
    </ul>
  );
}
