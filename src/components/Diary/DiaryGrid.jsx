import {
  getJosa,
  getMoodMessage,
  getActivityMessage,
  getPortionMessage,
  getPCondMessage,
} from "../../utils/diaryMessage";

export default function DiaryGrid({ selectedCat, diaryData }) {
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

  const moodMessage = getMoodMessage(mood);
  const activityMessage = getActivityMessage(activity_level);
  const portionMessage = getPortionMessage(portion_status);
  const additionalMessages = [];

  const createPMessages = (num, cond, type) => {
    if (num === "없음") {
      return `${type}가 없었어요.`;
    } else if (num || cond) {
      let message = "";
      if (cond) {
        message += `${getPCondMessage(cond)} ${type}${getJosa(type)} `;
      } else {
        message += `${type}${getJosa(type)} `;
      }
      if (num) {
        message += `${num}개 `;
      }
      message += "만들었어요.";
      return message;
    }
    return "";
  };

  const poopMessage = createPMessages(
    sweet_potato_num,
    sweet_potato_cond,
    "맛동산"
  );
  const peeMessage = createPMessages(potato_num, potato_cond, "감자");

  if (poopMessage) additionalMessages.push(poopMessage);
  if (peeMessage) additionalMessages.push(peeMessage);

  if (weight) {
    additionalMessages.push(`몸무게는 ${weight}kg`);
  }
  if (abnomal_act || abnomal_detail) {
    let message = "특이사항은 ";
    if (abnomal_act) {
      message += `${abnomal_act}`;
    }
    if (abnomal_act && abnomal_detail) {
      message += `, `;
    }
    if (abnomal_detail) {
      message += `${abnomal_detail}`;
    }
    message += ".";
    additionalMessages.push(message);
  }

  if (note) {
    additionalMessages.push(`추가로 ${note}.`);
  }

  const generateMessage = () => {
    const baseMessage = `${
      selectedCat.name
    }는 ${moodMessage} ${activityMessage} ${portionMessage} ${additionalMessages.join(
      " "
    )}`;
    return comment ? `${comment}, ${baseMessage}` : baseMessage;
  };

  const message = diaryData ? generateMessage() : "오늘의 일기를 추가해주세요.";

  const gridLength = diaryData ? 143 : 143;

  const gridItems = Array.from({ length: gridLength }, (_, index) => {
    const char = message[index] || ""; // 이름의 각 글자를 순서대로 가져옴, 없으면 빈 문자열
    return (
      <div key={index} className="grid-item">
        {char}
      </div>
    );
  });

  return (
    <div className="diary-grid-parant-container">
      <div className="diary-grid-container">{gridItems}</div>
    </div>
  );
}
