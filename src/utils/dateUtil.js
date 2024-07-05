// 날짜 객체를 로컬타임존의 ISO 날짜 문자열로 변환
export const getLocalISODateString = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 10);
  return localISOTime;
};

// midDate, maxDate 설정
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
