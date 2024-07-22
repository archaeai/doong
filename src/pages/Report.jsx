import { useContext, useEffect, useState } from "react";
import { getFormattedCurrentDate } from "../utils/dateUtil";
import { DiaryContext } from "../contexts/DiaryContext";
import { CatContext } from "../contexts/CatContext";
import CatSelect from "../UI/CatSelect";
import ReportStateBox from "../components/Report/ReportStateBox";
import ReportEvent from "../components/Report/ReportEvent";
import ReportLineChart from "../components/Report/ReportLineChart";
import "../styles/Report.css";

export default function ReportPage() {
  const { fetchStatisticsOfDiary } = useContext(DiaryContext);
  const { selectedCat } = useContext(CatContext);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("06");

  useEffect(() => {
    if (selectedCat) {
      fetchStatisticsOfDiary(selectedCat.id, selectedYear, selectedMonth);
    }
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <>
      <h1>{getFormattedCurrentDate()}</h1>
      <div className="page-content report-page-content">
        <div className="report-header">
          <h2 className="report-heading">6월</h2>
          <div className="report-filters">
            <CatSelect />
            <select
              className="report-filter-select"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              aria-placeholder="년"
            >
              <option value="2024">2024년</option>
              <option value="2023">2023년</option>
              <option value="2022">2022년</option>
            </select>
            <select
              className="report-filter-select"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              aria-placeholder="월"
            >
              <option value="01">1월</option>
              <option value="02">2월</option>
              <option value="03">3월</option>
              <option value="04">4월</option>
              <option value="05">5월</option>
              <option value="06">6월</option>
              <option value="07">7월</option>
              <option value="08">8월</option>
              <option value="09">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </select>
          </div>
        </div>
        <div className="report-grid-container">
          <div className="report-stats-grid">
            <ReportStateBox title={"몸무게"} num={6.5} />
            <ReportStateBox title={"title"} num={0} />
            <ReportStateBox title={"title"} num={0} />
            <ReportStateBox title={"title"} num={0} />
          </div>
          <div className="report-best-photo">
            <img src="path/to/best-photo.jpg" alt="Best Cat Photo" />
          </div>
          <ReportEvent />
          <div className="report-graph">
            <ReportLineChart />
          </div>
        </div>
      </div>
    </>
  );
}
