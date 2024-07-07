export default function RecentSchedule({ cat }) {
  return (
    <div className="home-schedule__container">
      <h3 className="home-schedule__heading">최근 일정</h3>
      {cat ? (
        <>
          <p>종합접종일 : {cat.vaccine_date}</p>
          <p>심장사상충 접종일 : {cat.heart_warm_date}</p>
          <p>전체모래갈이일 : {cat.litter_date}</p>
        </>
      ) : (
        <p>최근 일정이 없습니다.</p>
      )}
    </div>
  );
}
