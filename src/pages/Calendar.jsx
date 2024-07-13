import { useState, useContext, useEffect } from "react";
import Calendar from "react-calendar";
import useModal from "../hooks/useModal";
import useCurrentDate from "../hooks/useCurrentDate";
import Modal from "../UI/Modal";
import AddEventForm from "../components/Calendar/AddEventForm";
import EventListModal from "../components/Calendar/EventListModal";
import { getLocalISODateString, getDateRange } from "../utils/dateUtil";
import { CatContext } from "../contexts/CatContext";
import { TaskContext } from "../contexts/TaskContext";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar_ver2.css";

export default function CalendarPage() {
  const { selectedCat } = useContext(CatContext);
  const {
    fetchCalendarTasks,
    addCalendarTask,
    calendarTasks,
    deleteCalendarTask,
  } = useContext(TaskContext);
  const [date, setDate] = useState(new Date());
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedDate, setSelectedDate] = useState("");
  const [isAddEvent, setIsAddEvent] = useState(false);
  const { minDate, maxDate } = getDateRange(5);
  const currentDate = useCurrentDate();

  useEffect(() => {
    if (selectedCat) {
      fetchCalendarTasks(selectedCat.id);
    }
  }, []);

  const handleAddEvent = async (formData) => {
    const { selectedDate, eventTitle, lastDone, nextDone } = formData;
    try {
      await addCalendarTask({
        task_id: 0,
        cat_id: selectedCat.id,
        last_done: lastDone,
        next_done: nextDone,
        note: eventTitle,
      });
      closeModal();
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCalendarTask(id);
      console.log(`Non-daily task with id ${id} has been deleted`);
    } catch (error) {
      console.error(`Failed to delete non-daily task with id ${id}: `, error);
    }
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
    return calendarTasks
      .filter((event) => event.next_done === dateString)
      .map((event, index) => (
        <div key={index} className="event">
          <p>{event.note}</p>
        </div>
      ));
  };

  return (
    <>
      <h1>{currentDate}</h1>
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
                events={calendarTasks.filter(
                  (event) => event.date === selectedDate
                )}
                closeModal={closeModal}
              />
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
