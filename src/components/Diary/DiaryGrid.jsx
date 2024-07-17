import "../../styles/DiaryGrid.css";
// import { generateDiaryMessage } from "../../utils/diaryMessage";

export default function DiaryGrid({ diaryData }) {
  console.log("DiaryData:", diaryData);
  const message = diaryData.date || "";
  const noDiaryMessage = "아직 작성된 일기가 없습니다.";

  // message = diaryData ? generateDiaryMessage(diaryData) : noDiaryMessage;

  const gridItems = Array.from({ length: 120 }, (_, index) => {
    const char = message[index] || ""; // 이름의 각 글자를 순서대로 가져옴, 없으면 빈 문자열
    return (
      <div key={index} className="grid-item">
        {char}
      </div>
    );
  });

  return <div className="diary-grid-container">{gridItems}</div>;
}
