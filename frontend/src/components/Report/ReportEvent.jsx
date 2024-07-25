export default function ReportEvent({ report }) {
  if (!report || !report.special_notes) {
    return (
      <div className="report-note">특이사항 데이터를 가져오지 못했습니다.</div>
    );
  }

  const specialNotes = report.special_notes;
  const generateKey = (date, note) => `${date}-${note}`;

  return (
    <div className="report-note">
      <h4 className="report-heading">특이사항</h4>
      <ul className="report-note__ul">
        {specialNotes.map(({ date, note }) => (
          <li key={generateKey(date, note)} className="report-note__li">
            <span className="report-note__li-date">{date}: </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
