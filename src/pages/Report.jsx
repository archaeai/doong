import { getFormattedCurrentDate } from "../utils/dateUtil";

export default function ReportPage() {
  return (
    <>
      <h1>{getFormattedCurrentDate()}</h1>
      <div className="page-content">
        <h1>통계</h1>
      </div>
    </>
  );
}
