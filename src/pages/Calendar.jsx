import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <Calendar
        locale="ko"
        onChange={setDate}
        value={date}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => date.getDate().toString()}
        showNeighboringMonth={false}
        // tileContent={tileContent}
      />
    </div>
  );
}
