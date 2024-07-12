import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

export default function RoutineAddForm({ closeForm, addDefaultTask }) {
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
    console.log("Form submitted with values:", {
      note,
      repeatInterval,
      periodType,
    }); // 폼 제출 값 로그 추가
    addDefaultTask(); // API로 데이터 전송
    closeForm(); // 폼 닫기
  };

  return (
    <form onSubmit={handleSubmit} className="routine-add-form">
      <select
        className="settings-select"
        value={periodType}
        onChange={(e) => updatePeriodType(e.target.value)}
        required
      >
        <option value="" disabled>
          반복
        </option>
        <option value="1">매일</option>
        <option value="7">매주</option>
        <option value="14">2주</option>
        <option value="21">3주</option>
        <option value="30">매달</option>
      </select>
      <input
        type="number"
        value={repeatInterval}
        onChange={(e) => updateRepeatInterval(e.target.value)}
        placeholder="반복 주기 간격을 입력하세요."
        className="routine-add-form__input"
        required
      />
      <input
        type="text"
        value={note}
        onChange={(e) => updateNote(e.target.value)}
        placeholder="루틴을 입력하세요."
        className="routine-add-form__input"
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
