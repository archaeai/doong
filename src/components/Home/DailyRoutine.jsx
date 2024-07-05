import { useContext } from "react";
import { RoutineContext } from "../../contexts/RoutineContext";

export default function DailyRoutine() {
  const { todayTodos, toggleTodoCompletion } = useContext(RoutineContext);

  return (
    <div className="home-schedule__container">
      <h3 className="home-schedule__heading">오늘 할일</h3>
      <ul className="checklist">
        {todayTodos.map((todo) => (
          <li className="checklist__li" key={todo.id}>
            <input
              id={`todo-${todo.id}`}
              className="checklist__box"
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                toggleTodoCompletion("today", todo.id);
              }}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`checklist__label ${todo.done ? "checked" : ""}`}
            >
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
