import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { formatDateWithoutDay } from "../../utils/dateUtil";

export default function RecentSchedule({ cat }) {
  const { fetchRecentDoneTasks } = useContext(TaskContext);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const loadRecentTasks = async () => {
      if (cat) {
        const tasks = await fetchRecentDoneTasks(cat.id);
        setRecentTasks(tasks);
      }
    };
    loadRecentTasks();
  }, [cat, fetchRecentDoneTasks]);

  return (
    <div className="home-schedule__container">
      <h3 className="home-schedule__heading">최근 일정</h3>
      {recentTasks.length ? (
        <ul className="home-schedule__ul">
          {recentTasks.map((task) => (
            <li key={task.id} className="home-schedule__li">
              <span className="home-schedule__li-date">
                {formatDateWithoutDay(new Date(task.date))}:{" "}
              </span>
              <span>{task.note}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>최근 일정이 없습니다.</p>
      )}
    </div>
  );
}
