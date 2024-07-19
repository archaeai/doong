import { getFormattedCurrentDate } from "../utils/dateUtil";
import ReportStateBox from "../components/Report/ReportStateBox";
import ReportEvent from "../components/Report/ReportEvent";
import "../styles/Report.css";

export default function ReportPage() {
  return (
    <>
      <h1>{getFormattedCurrentDate()}</h1>
      <div className="page-content report-page-content">
        <div className="report-header">
          <h2 className="report-heading">6월</h2>
          <div className="report-filters">
            <select
              className="report-filter-select"
              name="year"
              aria-placeholder="년"
            >
              <option value="2024">2024년</option>
              <option value="2023">2023년</option>
              <option value="2022">2022년</option>
            </select>
            <select
              className="report-filter-select"
              name="month"
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
            <ReportStateBox title={1} num={6.5} />
            <ReportStateBox title={1} num={6.5} />
            <ReportStateBox title={1} num={6.5} />
          </div>
          <div className="report-best-photo">
            <img src="path/to/best-photo.jpg" alt="Best Cat Photo" />
          </div>
          <ReportEvent />
          <div className="report-graph">그래프</div>
        </div>
      </div>
    </>
  );
}
