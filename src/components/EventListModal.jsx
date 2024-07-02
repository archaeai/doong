import React from "react";

const EventListModal = ({ events, closeModal }) => {
  return (
    <div>
      <h2>일정 목록</h2>
      {events && events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      ) : (
        <p>일정이 없습니다.</p>
      )}
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};
export default EventListModal;
