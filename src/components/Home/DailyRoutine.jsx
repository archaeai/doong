import { useContext } from "react";
import { RoutineContext } from "../../contexts/RoutineContext";

import AddTodoForm from "./AddTodoForm";

export default function DailyRoutine() {
  const { todayTodos, addTodos, toggleTodoCompletion } =
    useContext(RoutineContext);

  const allTodos = [...todayTodos, ...addTodos];

  console.log("allTodos", allTodos);

  return (
    <div className="home-schedule__container">
      <h3 className="home-schedule__heading">오늘 할일</h3>
      <AddTodoForm />
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
