import { useContext } from "react";
import { CatContext } from "../contexts/CatContext";
import useModal from "../hooks/useModal";
import useCurrentDate from "../hooks/useCurrentDate";

import AddHeader from "../components/Home/AddHeader";
import CatProfile from "../components/Home/CatProfile";
import RecentSchedule from "../components/Home/RecentSchedule";
import UpcomingSchedule from "../components/Home/UpcomingSchedule";
import DailyRoutine from "../components/Home/DailyRoutine";
import AddCatForm from "../components/AddCatForm/AddCatForm";

import "../styles/Home.css";

export default function HomePage() {
  const { selectedCat, cats } = useContext(CatContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const currentDate = useCurrentDate();

  return (
    <>
      <h1>{currentDate}</h1>
      <div className="page-content home-page-content">
        <div className="header-container">
          <div className="header-profile-container">
            <AddHeader openModal={openModal} />
            <CatProfile cat={selectedCat} />
          </div>
          <RecentSchedule />
        </div>
        <div className="divider"></div>
        <div className="home-content-container">
          <UpcomingSchedule cat={selectedCat} />
          <DailyRoutine cat={selectedCat} />
        </div>
        <AddCatForm isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </>
  );
}
