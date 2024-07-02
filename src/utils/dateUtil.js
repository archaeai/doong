/**
 * 주어진 날짜 객체를 로컬 타임존의 ISO 형식 날짜 문자열로 변환합니다.
 * @param {Date} date - 변환할 날짜 객체
 * @returns {string} 로컬 타임존의 ISO 형식 날짜 문자열 (YYYY-MM-DD)
 */
export const getLocalISODateString = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000; // 타임존 오프셋을 밀리초 단위로 변환
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 10); // 오프셋을 적용하고 날짜 부분만 추출
  return localISOTime;
};
