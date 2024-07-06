import defaultProfile from "../../assets/cat-image.png";

export default function CatProfile() {
  return (
    <div className="cat-profile">
      <div className="profile-img-container">
        <img src={defaultProfile} />
      </div>
      <p>프로필을 추가해주세요.</p>
    </div>

    // <div>
    //   <img src={profileImg} alt="cat-profile" />
    //   <p>
    //     {cat.birthDate}
    //     {cat.age}
    //   </p>
    //   <p>{cat.breed}</p>
    //   <p>{cat.gender}</p>
    //   <p>{cat.weight}</p>
    //   <p>{cat.adoptionDate}</p>
    // </div>
  );
}
