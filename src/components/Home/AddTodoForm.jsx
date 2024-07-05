import React, { useState, useContext } from "react";
import { RoutineContext } from "../../contexts/RoutineContext";

export default function AddTodoForm() {
  const [newTodo, setNewTodo] = useState("");
  const { addCustomTodo } = useContext(RoutineContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addCustomTodo(newTodo);
      setNewTodo("");
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
    </form>
  );
}
