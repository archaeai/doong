import { useContext, useEffect } from "react";
import { CatContext } from "../contexts/CatContext";
import useModal from "../hooks/useModal";
import { getFormattedCurrentDate } from "../utils/dateUtil";
import AddHeader from "../components/Home/AddHeader";
import CatProfile from "../components/Home/CatProfile";
import RecentSchedule from "../components/Home/RecentSchedule";
import UpcomingSchedule from "../components/Home/UpcomingSchedule";
import TodayTasks from "../components/Home/TodayTasks";
import AddCatForm from "../components/AddCatForm/AddCatForm";

import "../styles/Home.css";

export default function HomePage() {
  const { cats, selectedCat, loadCats, selectCat } = useContext(CatContext);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (cats.length === 0) {
      loadCats();
    } else if (!selectedCat && cats.length > 0) {
      selectCat(cats[0]);
    }
  }, [loadCats, cats.length, selectedCat, selectCat, cats]);

  return (
    <>
      <h1>{getFormattedCurrentDate()}</h1>
      <div className="page-content home-page-content">
        <div className="header-container">
          <div className="header-profile-container">
            <AddHeader
              openModal={openModal}
              cats={cats}
              selectCat={selectCat}
              selectedCat={selectedCat}
            />
            <CatProfile cat={selectedCat} />
          </div>
          <RecentSchedule cat={selectedCat} />
        </div>
        <div className="divider"></div>
        <div className="home-content-container">
          <UpcomingSchedule cat={selectedCat} />
          <TodayTasks cat={selectedCat} />
        </div>
        <AddCatForm isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </>
  );
}
