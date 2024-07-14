import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { getPeriodTypeLabel } from "../../utils/dateUtil";

import RoutineAddForm from "./RoutineAddForm";
import RoutineEditForm from "./RoutineEditForm";

export default function RoutineSettings() {
  const {
    defaultTasks,
    fetchDefaultTasks,
    addDefaultTask,
    updateDefaultTask,
    deleteDefaultTask,
  } = useContext(TaskContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState(null);

  useEffect(() => {
    fetchDefaultTasks();
  }, []);

  const handleDelete = async (task) => {
    try {
      await deleteDefaultTask(task.id);
      console.log("Deleted default task", task);
      closeForm();
    } catch (error) {
      console.error("Failed to delete default task", error);
    }
  };

  const openAddForm = () => {
    setCurrentRoutine(null);
    setIsFormVisible(true);
  };

  const openEditForm = (task) => {
    if (defaultTasks.length > 0) {
      setCurrentRoutine(defaultTasks[0]); // 첫 번째 루틴을 기본으로 선택
      setIsFormVisible(true);
    }
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setCurrentRoutine(null);
  };

  return (
    <div className="routine-settings">
      <div className="routine-settings__header">
        <button className="routine-settings-header__add" onClick={openAddForm}>
          루틴 추가
        </button>
      </div>
      {isFormVisible &&
        (currentRoutine ? (
          <RoutineEditForm
            task={currentRoutine}
            closeForm={closeForm}
            updateDefaultTask={updateDefaultTask}
            deleteDefaultTask={deleteDefaultTask}
          />
        ) : (
          <RoutineAddForm
            closeForm={closeForm}
            addDefaultTask={addDefaultTask}
          />
        ))}
      <table className="routine-settings__table">
        <thead className="routine-settings__thead">
          <tr>
            <th className="number">순번</th>
            <th className="interval">주기</th>
            <th className="note">할일</th>
          </tr>
        </thead>
        <tbody>
          {defaultTasks.map((task, index) => (
            <tr key={task.id}>
              <td className="number">{index + 1}</td>
              <td className="interval">
                {task.period_int}
                {getPeriodTypeLabel(task.period_type)}
              </td>
              <td className="note">{task.note}</td>
              <td>
                <button onClick={openEditForm} className="todo-edit">
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task)}
                  className="todo-delete"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
