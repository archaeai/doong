import React from "react";

const ProfileSection = ({ onAddCatClick }) => {
  return (
    <div className="profile-section" onClick={onAddCatClick}>
      <img src="cat-profile.png" alt="프로필 이미지" />
      <p>프로필을 추가해주세요.</p>
    </div>
  );
};

export default ProfileSection;
