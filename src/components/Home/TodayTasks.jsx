import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";

import AddTodayTaskForm from "./AddTodayTaskForm";

export default function todayTasks({ cat }) {
  const { todayTasks, addTasks, toggleTaskCompletion, fetchTodayTasks } =
    useContext(TaskContext);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => setIsFormVisible(true);
  const closeForm = () => setIsFormVisible(false);

  // 컴포넌트가 마운트될 때 오늘의 할 일을 불러옴
  useEffect(() => {
    if (cat) {
      const today = new Date().toISOString().split("T")[0];
      fetchTodayTasks(cat.id, today);
    }
  }, []);

  const allTodos = [...todayTasks, ...addTasks];

  return (
    <div className="home-schedule__container todo-list-container">
      <div className="home-schedule__add-header">
        <h3 className="home-schedule__heading">오늘 할일</h3>
        <button className="home-schedule__add-button" onClick={openForm}>
          +
        </button>
      </div>
      {isFormVisible && <AddTodayTaskForm closeForm={closeForm} cat={cat} />}
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
                toggleTaskCompletion(todo.id);
              }}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`checklist__label ${todo.done ? "checked" : ""}`}
            >
              {todo.note}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
