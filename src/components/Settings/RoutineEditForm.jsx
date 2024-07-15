import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

export default function RoutineEditForm({
  task,
  closeForm,
  updateDefaultTask,
}) {
  const {
    note,
    repeatInterval,
    periodType,
    updateNote,
    updateRepeatInterval,
    updatePeriodType,
  } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDefaultTask(task.id, { note, repeatInterval });
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="routine-edit-form">
      <div>{task.number}</div>
      <div className="routine-edit-form__interval-container">
        <input
          type="number"
          value={repeatInterval}
          onChange={(e) => updateRepeatInterval(e.target.value)}
          placeholder="1"
          className="routine-edit-form__interval"
          required
        />
        <select
          className="routine-edit-form__interval"
          value={periodType}
          onChange={(e) => updatePeriodType(e.target.value)}
          required
        >
          <option value="D">일</option>
          <option value="W">주</option>
          <option value="M">달</option>
          <option value="Y">년</option>
        </select>
      </div>
      <input
        type="text"
        value={note}
        onChange={(e) => updateNote(e.target.value)}
        required
      />
      <div className="routine-edit-form__action">
        <button type="submit" className="todo-edit">
          수정
        </button>
        <button type="button" onClick={closeForm} className="todo-delete">
          취소
        </button>
      </div>
    </form>
  );
}
