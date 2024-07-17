// utils.js
export const getMoodMessage = (mood) => {
  switch (mood) {
    case "행복":
      return "기분 최고였어요!";
    case "스트레스":
      return "예민했어요.";
    case "불안":
      return "불안했어요.";
    default:
      return "";
  }
};

export const getActivityMessage = (activity_level) => {
  switch (activity_level) {
    case "높음":
      return "집사랑 신나게 놀았고,";
    case "중간":
      return "활동은 평소와 같았고,";
    case "낮음":
      return "조용했어요.";
    default:
      return "";
  }
};

export const getPortionMessage = (portion_status) => {
  switch (portion_status) {
    case "부족":
      return "많이 먹었어요.";
    case "적정":
      return "밥은 적당히 먹었어요.";
    case "남음":
      return "밥이 남았어요.";
    default:
      return "";
  }
};

export const getPCondMessage = (cond) => {
  switch (cond) {
    case "무름":
      return "무른";
    case "마름":
      return "마른";
    case "작음":
      return "작은";
    case "큼":
      return "큰";
    case "정상":
    case "헐변":
    case "점액질":
      return cond;
    default:
      return cond;
  }
};

// // diary 데이터를 기반으로 메시지 생성
// export const generateDiaryMessage = (diaryData) => {
//   if (!diaryData) return "아직 작성된 일기가 없습니다.";

//   const {
//     date = "",
//     mood = "",
//     activity_level = "",
//     portion_status = "",
//     sweet_potato_num = "",
//     sweet_potato_cond = "",
//     potato_num = "",
//     potato_cond = "",
//     weight = 0,
//     abnomal_act = "",
//     abnomal_detail = "",
//     note = "",
//     comment = "",
//     photo_url = "",
//   } = diaryData;

//   let message = "";

//   message += `날짜: ${date}\n`;
//   if (mood) message += `기분: ${mood}\n`;
//   if (activity_level) message += `활동 수준: ${activity_level}\n`;
//   if (portion_status) message += `식사 상태: ${portion_status}\n`;
//   if (sweet_potato_num) message += `고구마 개수: ${sweet_potato_num}\n`;
//   if (sweet_potato_cond) message += `고구마 상태: ${sweet_potato_cond}\n`;
//   if (potato_num) message += `감자 개수: ${potato_num}\n`;
//   if (potato_cond) message += `감자 상태: ${potato_cond}\n`;
//   if (weight) message += `몸무게: ${weight}kg\n`;
//   if (abnomal_act) message += `이상 행동: ${abnomal_act}\n`;
//   if (abnomal_detail) message += `상세 내용: ${abnomal_detail}\n`;
//   if (note) message += `노트: ${note}\n`;
//   if (comment) message += `코멘트: ${comment}\n`;
//   if (photo_url) message += `사진 URL: ${photo_url}\n`;

//   return message.trim();
// };
