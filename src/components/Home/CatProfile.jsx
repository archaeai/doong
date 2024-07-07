import defaultProfile from "../../assets/cat-image.png";

export default function CatProfile({ cat }) {
  return (
    <div className="cat-profile">
      {cat ? (
        <>
          <div className="profile-img-container">
            <img src={`backend/${cat.photo_url}` || defaultProfile} />
          </div>
          <p>{cat.name}</p>
        </>
      ) : (
        <>
          <div className="profile-img-container">
            <img src={defaultProfile} />
          </div>
          <p>프로필을 추가해주세요.</p>
        </>
      )}
    </div>
  );
}
