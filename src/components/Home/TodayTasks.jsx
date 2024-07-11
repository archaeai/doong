import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";

import AddTodayTaskForm from "./AddTodayTaskForm";

export default function todayTasks() {
  const {
    todayTasks,
    addTasks,
    toggleTaskCompletion,
    isFormVisible,
    openForm,
    closeForm,
    fetchTodayTasks,
  } = useContext(TaskContext);

  // 컴포넌트가 마운트될 때 오늘의 할 일을 불러옴
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 yyyy-mm-dd 형식으로 가져옴
    const catId = 1; // 예시로 사용한 고양이 ID
    fetchTodayTasks(catId, today);
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
      {isFormVisible && <AddTodayTaskForm closeForm={closeForm} />}
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
