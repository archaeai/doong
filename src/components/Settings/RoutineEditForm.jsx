import { useState, useEffect } from "react";

export default function RoutineEditForm({
  task,
  closeForm,
  updateDefaultTask,
  updateRepeatInterval,
}) {
  const [note, setNote] = useState(task.note);
  const [repeatInterval, setRepeatInterval] = useState(task.repeatInterval);
  const [periodType, setPeriodType] = useState(task.period_type);

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
          className="routine-add-form__interval"
          required
        />
        <select
          className="settings-select"
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(e.target.value)}
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
        onChange={(e) => setNote(e.target.value)}
        required
      />

      <button type="submit" className="todo-edit">
        수정
      </button>
      <button type="button" onClick={closeForm} className="todo-delete">
        취소
      </button>
    </form>
  );
}
