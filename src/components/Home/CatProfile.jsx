import defaultProfile from "../../assets/cat-image.png";
import { getDaysSince, getFormattedCurrentDate } from "../../utils/dateUtil";

export default function CatProfile({ cat }) {
  return (
    <div className="cat-profile">
      {cat ? (
        <>
          <div className="profile-img-container">
            <img src={`backend/${cat.photo_url}` || defaultProfile} />
          </div>
          <div className="profile-info-container">
            <p>
              {cat.breed} ({cat.weight} kg)
            </p>
            <p>{cat.gender === "male" ? "남" : "여"}</p>
            <p>생일: {getFormattedCurrentDate(cat.birthday)}</p>
            <p>
              {cat.name}랑 {getDaysSince(cat.adopted_day)}일째❤︎
            </p>
          </div>
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
