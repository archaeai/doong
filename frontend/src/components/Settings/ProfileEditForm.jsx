export default function ProfileEditForm({
  cat,
  isEditing,
  onChange,
  handleFilePreview,
}) {
  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      onChange((prevCat) => ({
        ...prevCat,
        [name]: file,
      }));
      handleFilePreview(e);
    } else {
      onChange((prevCat) => ({ ...prevCat, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange((prevCat) => ({ ...prevCat, [name]: checked }));
  };

  const renderInputField = (label, name, type = "text", value = "") => (
    <li className="profile-settings-content__li">
      <label className="profile-settings-content__label">{label}:</label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
        />
      ) : (
        <span>{value}</span>
      )}
    </li>
  );

  return (
    <ul className="profile-settings-content__ul">
      {isEditing && (
        <li className="profile-settings-content__li">
          <label htmlFor="photo" className="profile-settings-content__label">
            사진:
          </label>
          <input
            id="photo"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
          />
        </li>
      )}
      {renderInputField("이름", "name", "text", cat.name)}
      {renderInputField("품종", "breed", "text", cat.breed)}
      {renderInputField("체중", "weight", "text", cat.weight)}
      {renderInputField("성별", "gender", "text", cat.gender)}
      {renderInputField("생일", "birthday", "date", cat.birthday)}
      {renderInputField("입양일", "adopted_day", "date", cat.adopted_day)}
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
