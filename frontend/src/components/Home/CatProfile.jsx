import defaultProfile from "../../assets/cat-image.png";
import { getDaysSince, formatServerDate } from "../../utils/dateUtil";

export default function CatProfile({ cat }) {
  return (
    <div className="cat-profile">
      {cat ? (
        <>
          <div className="profile-img-container">
            <img
              src={cat.photo_url ? `backend/${cat.photo_url}` : defaultProfile}
              alt={cat.name}
            />
          </div>
          <div className="profile-info-container">
            <p className="profile-info-line1">
              {cat.name}랑 ❤︎ {getDaysSince(cat.adopted_day)}일째
            </p>
            <div className="profile-info-line2">
              <p className="gender-icon">
                {cat.gender === "female" ? "♀" : "♂"}
              </p>
              <p>{cat.breed}</p>
            </div>
            <p>몸무게: {cat.weight} kg</p>
            <p>생일: {formatServerDate(cat.birthday)}</p>

            {!cat.neutered && <p className="no-neutered">중성화가 필요해요!</p>}
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
