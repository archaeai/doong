import { useContext, useEffect } from "react";
import { getFormattedCurrentDate } from "../utils/dateUtil";
import { DiaryContext } from "../contexts/DiaryContext";
import { CatContext } from "../contexts/CatContext";
import CatSelect from "../UI/CatSelect";
import useDateSelect from "../hooks/useDateSelect";
import ReportStateBox from "../components/Report/ReportStateBox";
import ReportEvent from "../components/Report/ReportEvent";
import ImageSlider from "../components/Report/ImageSlider";
import ReportLineChart from "../components/Report/ReportLineChart";
import "../styles/Report.css";

export default function ReportPage() {
  const { fetchStatisticsOfDiary, report } = useContext(DiaryContext);
  const { selectedCat } = useContext(CatContext);
  const {
    selectedYear,
    selectedMonth,
    years,
    months,
    handleYearChange,
    handleMonthChange,
  } = useDateSelect();

  useEffect(() => {
    if (selectedCat && selectedYear && selectedMonth) {
      fetchStatisticsOfDiary(selectedCat.id, selectedYear, selectedMonth);
    }
    console.log("fetched report: ", report);
  }, [selectedCat, selectedYear, selectedMonth, fetchStatisticsOfDiary]);

  return (
    <>
      <h1>{getFormattedCurrentDate()}</h1>
      <div className="page-content report-page-content">
        <div className="report-header">
          <h2 className="report-heading">{selectedMonth}월</h2>
          <div className="report-filters">
            <CatSelect />
            <select
              className="report-filter-select"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              aria-placeholder="년"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select
              className="report-filter-select"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              aria-placeholder="월"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {report ? (
          <div className="report-grid-container">
            <div className="report-stats-grid">
              <ReportStateBox
                title={"집사랭킹"}
                num={`${report.butler_rank_percentile}위`}
              />
              <ReportStateBox
                title={"집사점수"}
                num={`${report.butler_score}점`}
              />
              <ReportStateBox
                title={"기록을 안한날"}
                num={`${report.diary_skip_days}일`}
              />
              <ReportStateBox
                title={"할일 완료도"}
                num={`${report.daily_task_completion_rate}%`}
              />
            </div>
            <ImageSlider report={report} />
            <ReportEvent report={report} />
            <div className="report-graph">
              <ReportLineChart />
            </div>
          </div>
        ) : (
          <div>데이터가 없습니다...</div>
        )}
      </div>
    </>
  );
}
