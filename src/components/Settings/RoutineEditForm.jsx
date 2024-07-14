import { useState, useEffect } from "react";

export default function RoutineEditForm({
  task,
  closeForm,
  updateDefaultTask,
}) {
  const [note, setNote] = useState(task.note);
  const [repeatInterval, setRepeatInterval] = useState(task.repeatInterval);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDefaultTask(task.id, { note, repeatInterval });
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="routine-edit-form">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />
      <select
        className="settings-select"
        value={repeatInterval}
        onChange={(e) => setRepeatInterval(e.target.value)}
        required
      >
        <option value="매일">매일</option>
        <option value="주간">주간</option>
        <option value="월간">월간</option>
      </select>
      <button type="submit">수정</button>
      <button type="button" onClick={closeForm}>
        취소
      </button>
    </form>
  );
}
