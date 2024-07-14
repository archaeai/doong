import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../contexts/TaskContext";

export default function UpcomingSchedule({ cat }) {
  const { fetchUpcomingTasks } = useContext(TaskContext);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const loadUpcomingTasks = async () => {
      if (cat) {
        const tasks = await fetchUpcomingTasks(cat.id);
        setUpcomingTasks(tasks);
      }
    };

    loadUpcomingTasks();
  }, [cat, fetchUpcomingTasks]);

  return (
    <div className="home-schedule__container">
      <h3 className="home-schedule__heading">다가오는 일정</h3>
      {upcomingTasks.length ? (
        <ul>
          {upcomingTasks.map((task) => (
            <li key={task.id}>
              <span>
                {task.date} -{task.note}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>다가오는 일정이 없습니다.</p>
      )}
    </div>
  );
}
