const EventListModal = ({ events, closeModal, onDelete }) => {
  return (
    <div>
      <h2>일정 목록</h2>
      {events && events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.note}
              <button
                onClick={() => onDelete(event.id)}
                style={{
                  marginLeft: "auto",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--color-maroon)",
                  fontFamily: "Gaegu",
                }}
              >
                삭제
              </button>
            </li>
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
