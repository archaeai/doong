import { useContext, useState } from "react";
import { CatContext } from "../contexts/CatContext";

import profileImg from "../assets/cat-image.png";
import AddHeader from "../components/AddHeader";
import CatProfile from "../components/CatProfile";
import UpcomingSchedule from "../components/UpcomingSchedule";
import DailyRoutine from "../components/DailyRoutine";
import AddCatModal from "../components/AddCatModal";

export default function HomePage() {
  const { selectedCat } = useContext(CatContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <AddHeader openModal={openModal} />
      {selectedCat ? (
        <>
          <CatProfile cat={selectedCat} />
          <UpcomingSchedule cat={selectedCat} />
          <DailyRoutine cat={selectedCat} />
        </>
      ) : (
        <div>
          <div className="cat-profile-placeholder">
            <img
              src={profileImg}
              alt="cat-profile-image"
              style={{ width: "100px", height: "100px" }}
            />
            <p>프로필을 추가해주세요.</p>
          </div>
          <div className="upcoming-schedule-placeholder">
            <p>최근 일정이 없습니다.</p>
          </div>
          <div className="daily-routine-placeholder">
            <p>오늘 할 일을 추가해주세요.</p>
            <ul>
              <li>밥</li>
              <li>물</li>
              <li>화장실 청소</li>
              <li>바닥 청소</li>
              <li>사냥놀이 15분</li>
              <li>빗질</li>
              <li>양치</li>
            </ul>
          </div>
        </div>
      )}
      {isModalOpen && <AddCatModal closeModal={closeModal} />}
    </div>
  );
}
