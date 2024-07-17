import { useContext } from "react";
import "../../styles/DiaryGrid.css";
import { CatContext } from "../../contexts/CatContext";
import {
  getMoodMessage,
  getActivityMessage,
  getPortionMessage,
  getPCondMessage,
} from "../../utils/diaryMessage";

export default function DiaryGrid({ diaryData }) {
  const { selectedCat } = useContext(CatContext);
  const {
    date = "",
    note = "",
    mood = "",
    activity_level = "",
    portion_status = "",
    sweet_potato_num = "",
    sweet_potato_cond = "",
    potato_num = "",
    potato_cond = "",
    weight = 0,
    abnomal_act = "",
    abnomal_detail = "",
    comment = "",
  } = diaryData || {};

  const safeValue = (value) => value ?? "";

  const moodMessage = getMoodMessage(mood);
  const activityMessage = getActivityMessage(activity_level);
  const portionMessage = getPortionMessage(portion_status);

  const additionalMessages = [];
  if (sweet_potato_num || sweet_potato_cond) {
    let message = "";
    if (sweet_potato_cond) {
      message += `${getPCondMessage(sweet_potato_cond)} 고구마를 `;
    } else {
      message += "고구마를 ";
    }
    if (sweet_potato_num) {
      message += `${sweet_potato_num}개 `;
    }
    message += "만들었어요.";
    additionalMessages.push(message);
  }

  if (potato_num || potato_cond) {
    let message = "";
    if (potato_cond) {
      message += `${getPCondMessage(potato_cond)} 감자를 `;
    } else {
      message += "감자를 ";
    }
    if (potato_num) {
      message += `${potato_num}개 `;
    }
    message += "만들었어요.";
    additionalMessages.push(message);
  }

  if (weight) {
    additionalMessages.push(`몸무게는 ${weight}kg`);
  }
  if (abnomal_act) {
    additionalMessages.push(`특이행동은 ${abnomal_act}. ${abnomal_detail}`);
  }
  if (comment) {
    additionalMessages.push(`추가로 ${comment}`);
  }

  const message = diaryData
    ? `${date} ${note}, ${
        selectedCat.name
      }는 ${moodMessage} ${activityMessage} ${portionMessage} ${additionalMessages.join(
        " "
      )}`
    : "아직 작성된 일기가 없습니다.";

  const gridItems = Array.from({ length: 143 }, (_, index) => {
    const char = message[index] || ""; // 이름의 각 글자를 순서대로 가져옴, 없으면 빈 문자열
    return (
      <div key={index} className="grid-item">
        {char}
      </div>
    );
  });

  return <div className="diary-grid-container">{gridItems}</div>;
}
