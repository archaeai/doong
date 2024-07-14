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
import "../styles/Calendar.css";

export default function CalendarPage() {
  const { cats, selectedCat } = useContext(CatContext);
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

  const getEventClass = (catId) => {
    switch (catId) {
      case 1:
        return "event-lavender";
      case 2:
        return "event-peach-puff";
      case 3:
        return "event-light-pink";
      case 4:
        return "event-powder-blue";
      case 5:
        return "event-pale-green";
      default:
        return "event-default";
    }
  };

  useEffect(() => {
    if (cats.length > 0) {
      const catIds = cats.map((cat) => cat.id);
      fetchCalendarTasks(catIds);
    }
  }, [cats]);

  const handleAddEvent = async (formData) => {
    try {
      const { selectedDate, eventTitle } = formData;
      const task = {
        task_id: 0,
        cat_id: selectedCat.id,
        date: selectedDate,
        note: eventTitle,
        done: false,
      };
      console.log("전송할 데이터:", task);
      await addCalendarTask(task);
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
      .filter((event) => event.date === dateString)
      .map((event, index) => (
        <div key={index} className={`event ${getEventClass(event.cat_id)}`}>
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
                selectedCat={selectedCat}
              />
            ) : (
              <EventListModal
                events={calendarTasks.filter(
                  (event) => event.date === selectedDate
                )}
                closeModal={closeModal}
                onDelete={handleDelete}
              />
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
