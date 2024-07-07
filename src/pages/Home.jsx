import { useContext, useEffect } from "react";
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
  const { cats, selectedCat, addCat, selectCat } = useContext(CatContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const currentDate = useCurrentDate();

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch("http://127.0.0.1/api/cat_profiles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cat data");
        }

        const data = await response.json();
        data.forEach((cat) => addCat(cat)); // 가져온 데이터를 CatContext에 추가
      } catch (error) {
        console.error("Error fetching cat data:", error);
      }
    };

    fetchCatData();
  }, [addCat]);

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
