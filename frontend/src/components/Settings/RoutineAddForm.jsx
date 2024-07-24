import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { CatContext } from "../../contexts/CatContext";

export default function RoutineAddForm({ closeForm, addDefaultTask }) {
  const {
    note,
    repeatInterval,
    periodType,
    updateNote,
    updateRepeatInterval,
    updatePeriodType,
  } = useContext(TaskContext);
  const { selectedCat } = useContext(CatContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", {
      note,
      repeatInterval,
      periodType,
      catId: selectedCat.id,
    });
    await addDefaultTask(selectedCat.id);
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="routine-add-form">
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
          <option value="" disabled>
            간격
          </option>
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
        placeholder="루틴을 입력하세요."
        className="routine-add-form__note"
        required
      />
      <button type="submit" className="task-add-button">
        추가
      </button>
      <button type="button" onClick={closeForm} className="task-cancel-button">
        취소
      </button>
    </form>
  );
}
