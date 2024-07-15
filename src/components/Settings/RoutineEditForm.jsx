import { useState, useEffect, useContext } from "react";
import { CatContext } from "../../contexts/CatContext";

export default function RoutineEditForm({
  task,
  closeForm,
  updateDefaultTask,
}) {
  const { selectedCat } = useContext(CatContext);
  const [note, setNote] = useState(task.note || "");
  const [repeatInterval, setRepeatInterval] = useState(task.period_int || 1);
  const [periodType, setPeriodType] = useState(task.period_type || "D");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      note,
      period_int: repeatInterval,
      period_type: periodType,
      cat_id: task.cat_id,
    };
    console.log("Updating task:", task.id, taskData);
    updateDefaultTask(task.id, taskData);

    closeForm();
  };

  const handleNoteChange = (e) => setNote(e.target.value);
  const handleRepeatIntervalChange = (e) => setRepeatInterval(e.target.value);
  const handlePeriodTypeChange = (e) => setPeriodType(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="routine-edit-form">
      <div>{task.number}</div>
      <div className="routine-edit-form__interval-container">
        <input
          type="number"
          value={repeatInterval}
          onChange={handleRepeatIntervalChange}
          placeholder="1"
          className="routine-edit-form__interval"
          required
        />
        <select
          className="routine-edit-form__interval"
          value={periodType}
          onChange={handlePeriodTypeChange}
          required
        >
          <option value="D">일</option>
          <option value="W">주</option>
          <option value="M">달</option>
          <option value="Y">년</option>
        </select>
      </div>
      <input type="text" value={note} onChange={handleNoteChange} required />
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
