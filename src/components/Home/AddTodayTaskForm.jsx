import React, { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import "../../styles/AddTodayTaskForm.css";

export default function AddTodayTaskForm({ closeForm }) {
  const [newTodo, setNewTodo] = useState("");
  const { addTodayTask } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const taskLogData = {
        date: new Date().toISOString().split("T")[0], // 오늘 날짜
        note: newTodo,
        done: false,
        task_id: 0, // 예시 값, 실제로 필요한 값으로 교체 필요
        cat_id: 0, // 예시 값, 실제로 필요한 값으로 교체 필요
      };
      try {
        await addTodayTask(taskLogData);
        setNewTodo("");
        closeForm();
      } catch (error) {
        console.error("Failed to add task", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="오늘 할 일을 추가해주세요."
        className="add-todo-input"
      />
      <button type="submit" className="add-todo-button">
        추가
      </button>
      <button type="button" className="cancel-todo-button" onClick={closeForm}>
        취소
      </button>
    </form>
  );
}
