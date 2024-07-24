export default function ReportStateBox({ title, num }) {
  return (
    <div className="report-state-box">
      <span className="report-state-box-title">{title}</span>
      <span className="report-state-box-value">{num}</span>
    </div>
  );
}
