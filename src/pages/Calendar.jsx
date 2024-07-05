import { useState } from "react";
import Calendar from "react-calendar";
import useModal from "../hooks/useModal";
import Modal from "../UI/Modal";
import AddEventForm from "../components/AddEventForm";
import EventListModal from "../components/EventListModal";
import { getLocalISODateString, getDateRange } from "../utils/dateUtil";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar_ver2.css";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedDate, setSelectedDate] = useState("");
  const [isAddEvent, setIsAddEvent] = useState(false);
  const { minDate, maxDate } = getDateRange(5);

  const handleAddEvent = (formData) => {
    const { selectedDate, eventTitle } = formData;
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (!newEvents[selectedDate]) {
        newEvents[selectedDate] = [];
      }
      newEvents[selectedDate].push(eventTitle);
      return newEvents;
    });
  };

  const handleDateClick = (date) => {
    const localDateString = getLocalISODateString(date);
    setSelectedDate(localDateString);
    setIsAddEvent(false);
    openModal();
  };

  const handleOpenAddEvent = () => {
    setSelectedDate("");
    setIsAddEvent(true);
    openModal();
  };

  const renderEvents = (date) => {
    const dateString = getLocalISODateString(date);
    return events[dateString]?.map((event, index) => (
      <div key={index} className="event">
        {event}
      </div>
    ));
  };

  return (
    <div className="page-content calendar-page-content">
      <div className="calendar-container">
        <span className="add-event-text" onClick={handleOpenAddEvent}>
          일정 추가
        </span>
        <Calendar
          onChange={setDate}
          value={date}
          minDate={minDate}
          maxDate={maxDate}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          onClickDay={handleDateClick}
          tileContent={({ date, view }) =>
            view === "month" && renderEvents(date)
          }
          formatDay={(locale, date) => date.getDate().toString()}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {isAddEvent ? (
            <AddEventForm
              onSubmit={handleAddEvent}
              closeModal={closeModal}
              initialDate={selectedDate}
            />
          ) : (
            <EventListModal
              events={events[selectedDate]}
              closeModal={closeModal}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
