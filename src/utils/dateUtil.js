// 날짜 객체를 로컬타임존의 ISO 날짜 문자열로 변환
export const getLocalISODateString = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 10);
  return localISOTime;
};

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

// 요일 포함 날짜 포맷 함수
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

// 요일을 포함하지 않은 날짜 포맷 함수
export const formatDateWithoutDay = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};

// 서버에서 받은 날짜 데이터를 포맷하는 함수
export const formatServerDate = (serverDate) => {
  const date = new Date(serverDate);
  return formatDateWithoutDay(date);
};

// 현재 날짜 가져오기
export const getCurrentLocalISODateString = () => {
  return getLocalISODateString(new Date());
};

// 현재 날짜 포맷된 문자열 가져오기
export const getFormattedCurrentDate = () => {
  return formatDate(new Date());
};

// midDate, maxDate 설정(캘린더에서 사용)
export const getDateRange = (years) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - years,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() + years,
    today.getMonth(),
    today.getDate()
  );
  return { minDate, maxDate };
};

// 입양일로부터 현재까지 며칠이 지났는지 계산하는 함수(홈화면에서 사용)
export const getDaysSince = (adoptedDay) => {
  const today = new Date();
  const adoptedDate = new Date(adoptedDay);
  const oneDay = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환
  const diffDays = Math.round((today - adoptedDate) / oneDay);
  return diffDays;
};
