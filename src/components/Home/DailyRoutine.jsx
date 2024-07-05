import { useContext } from "react";
import { RoutineContext } from "../../contexts/RoutineContext";

import AddTodoForm from "./AddTodoForm";

export default function DailyRoutine() {
  const {
    todayTodos,
    addTodos,
    toggleTodoCompletion,
    isFormVisible,
    toggleFormVisibility,
  } = useContext(RoutineContext);

  const allTodos = [...todayTodos, ...addTodos];

  return (
    <div className="home-schedule__container">
      <div className="home-schedule__add-header">
        <h3 className="home-schedule__heading">오늘 할일</h3>
        <button
          className="home-schedule__add-button"
          onClick={toggleFormVisibility}
        >
          +
        </button>
      </div>
      {isFormVisible && <AddTodoForm />}
      <ul className="checklist">
        {allTodos.map((todo) => (
          <li className="checklist__li" key={todo.id}>
            <input
              id={`todo-${todo.id}`}
              className="checklist__box"
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                console.log("Checkbox changed:", todo.id);
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
