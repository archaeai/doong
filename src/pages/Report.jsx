import useCurrentDate from "../hooks/useCurrentDate";

export default function ReportPage() {
  const currentDate = useCurrentDate();

  return (
    <>
      <h1>{currentDate}</h1>
      <div className="page-content">
        <h1>통계</h1>
      </div>
    </>
  );
}
