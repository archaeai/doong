// diary 데이터를 기반으로 메시지 생성
export const generateDiaryMessage = (diaryData) => {
  if (!diaryData) return "아직 작성된 일기가 없습니다.";

  const {
    date = "",
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
    note = "",
    comment = "",
    photo_url = "",
  } = diaryData;

  let message = "";

  message += `날짜: ${date}\n`;
  if (mood) message += `기분: ${mood}\n`;
  if (activity_level) message += `활동 수준: ${activity_level}\n`;
  if (portion_status) message += `식사 상태: ${portion_status}\n`;
  if (sweet_potato_num) message += `고구마 개수: ${sweet_potato_num}\n`;
  if (sweet_potato_cond) message += `고구마 상태: ${sweet_potato_cond}\n`;
  if (potato_num) message += `감자 개수: ${potato_num}\n`;
  if (potato_cond) message += `감자 상태: ${potato_cond}\n`;
  if (weight) message += `몸무게: ${weight}kg\n`;
  if (abnomal_act) message += `이상 행동: ${abnomal_act}\n`;
  if (abnomal_detail) message += `상세 내용: ${abnomal_detail}\n`;
  if (note) message += `노트: ${note}\n`;
  if (comment) message += `코멘트: ${comment}\n`;
  if (photo_url) message += `사진 URL: ${photo_url}\n`;

  return message.trim();
};
