import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";

import RoutineAddForm from "./RoutineAddForm";
import RoutineEditForm from "./RoutineEditForm";

export default function RoutineSettings() {
  const {
    defaultTasks,
    fetchDefaultTasks,
    addDefaultTask,
    updateDefaultTask,
    deleteDefaultTask,
    // openEditForm,
  } = useContext(TaskContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentRoutine, setCuttentRoutine] = useState(null);

  useEffect(() => {
    fetchDefaultTasks();
  }, [fetchDefaultTasks]);

  const openAddForm = () => {
    setCuttentRoutine(null);
    setIsFormVisible(true);
  };

  const openEditForm = (task) => {
    setCuttentRoutine(task);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setCuttentRoutine(null);
  };

  return (
    <div className="routine-settings">
      <div className="routine-settings__header">
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
                <td className="interval">{task.repeatInterval}</td>
                <td className="note">{task.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={openAddForm}>루틴 추가</button>
        {currentRoutine && (
          <button onClick={() => openEditForm(task)}>수정</button>
        )}
      </div>
      {isFormVisible &&
        (currentRoutine ? (
          <RoutineEditForm
            task={currentRoutine}
            closeForm={closeForm}
            updateDefaultTask={updateDefaultTask}
          />
        ) : (
          <RoutineAddForm
            closeForm={closeForm}
            addDefaultTask={addDefaultTask}
          />
        ))}
    </div>
  );
}
