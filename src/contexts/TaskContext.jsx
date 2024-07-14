import React, { createContext, useContext, useState, useCallback } from "react";
import * as taskApi from "../api/taskApi";

export const TaskContext = createContext();

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [defaultTaskId, setDefaultTaskId] = useState(null);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [addTasks, setAddTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [statistics, setStatistics] = useState({});
  // 루틴 추가 폼 상태
  const [note, setNote] = useState("");
  const [repeatInterval, setRepeatInterval] = useState("");
  const [periodType, setPeriodType] = useState("D");
  const [calendarTasks, setCalendarTasks] = useState([]);

  // 상태 업데이트 함수
  const updateNote = (value) => setNote(value);
  const updateRepeatInterval = (value) => setRepeatInterval(value);
  const updatePeriodType = (value) => setPeriodType(value);

  //홈페이지 오늘할일 API 함수
  // 오늘의 할 일 페치
  const fetchTodayTasks = useCallback(async (catId, date) => {
    try {
      const tasks = await taskApi.getTodayTasks(catId, date);
      setTodayTasks(tasks);
      console.log("Fetched today tasks:", tasks); // 로그 추가
    } catch (error) {
      console.error("Failed to fetch today tasks", error);
    }
  }, []);

  // 오늘 할 일 추가
  const addTodayTask = useCallback(async (task) => {
    try {
      const createdTask = await taskApi.addTodayTask(task);
      setTodayTasks([...todayTasks, createdTask]);
      console.log("Added task:", createdTask); // 로그 추가
    } catch (error) {
      console.error("Failed to add task", error);
    }
  }, []);
  //오늘 할일 삭제
  const deleteTodayTask = useCallback(async (id) => {
    try {
      await taskApi.deleteTodayTask(id);
      setTodayTasks(todayTasks.filter((task) => task.id !== id));
      console.log("Deleted task with id:", id); // 로그 추가
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }, []);

  // 할 일 완료 여부를 토글하는 함수
  const toggleTaskCompletion = useCallback(async (id) => {
    try {
      const task = todayTasks.find((t) => t.id === id);
      if (task) {
        const updatedTask = { ...task, done: !task.done };
        await taskApi.updateTodayTask(id, updatedTask);
        setTodayTasks(todayTasks.map((t) => (t.id === id ? updatedTask : t)));
      }
    } catch (error) {
      console.error("Failed to toggle task completion", error);
    }
  }, []);

  // 다가오는 일정을 API에서 불러오는 함수
  // useEffect(() => {
  //   const fetchUpcomingTasks = async () => {
  //     try {
  //       const tasks = await taskApi.getNonDailyTaskLogsByCat(1); // catId는 예시
  //       setUpcomingTasks(tasks);
  //     } catch (error) {
  //       console.error("Failed to fetch upcoming tasks", error);
  //     }
  //   };
  //   fetchUpcomingTasks();
  // }, []);

  // const fetchUpcomingTasks = async (catId) => {
  //   try {
  //     const tasks = await taskApi.getNonDailyTaskLogsByCat(catId);
  //     setUpcomingTasks(tasks);
  //   } catch (error) {
  //     console.error("Failed to fetch upcoming tasks", error);
  //   }
  // };

  // 캘린더 페이지 api 함수
  const fetchCalendarTasks = async (catId) => {
    try {
      const tasks = await taskApi.getNonDailyTaskLogs(catId);
      setCalendarTasks(tasks);
      console.log("Fetched non-daily tasks:", tasks);
    } catch (error) {
      console.error("Failed to fetch calendar tasks", error);
    }
  };

  const addCalendarTask = async (task) => {
    console.log("전송할 데이터:", task);
    try {
      const createdTask = await taskApi.createNonDailyTaskLog(task);
      setCalendarTasks((prevTasks) => [...prevTasks, createdTask]);
      console.log("Non-daily task successfully added:", createdTask);
    } catch (error) {
      console.error("Failed to add calendar task", error);
    }
  };

  const deleteCalendarTask = async (id) => {
    try {
      await taskApi.deleteNonDailyTaskLog(id);
      setCalendarTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
      console.log(`Non-daily task with id ${id} has been deleted`);
    } catch (error) {
      console.error(`Failed to delete non-daily task with id ${id}: `, error);
    }
  };

  //루틴설정페이지 API 함수
  const fetchDefaultTasks = async (catId) => {
    try {
      const tasks = await taskApi.getAllDefaultTasks(catId);
      setDefaultTasks(tasks);
      if (tasks.length > 0) {
        setDefaultTaskId(tasks[0].id); // 첫 번째 기본 작업의 ID를 추출하여 상태에 저장
      }
    } catch (error) {
      console.error("Failed to fetch default tasks", error);
    }
  };

  // 루틴을 API에서 불러오는 함수
  // const fetchDefaultTask = async (id) => {
  //   try {
  //     const task = await taskApi.getDefaultTask(id);
  //     setDefaultTasks((prevTasks) => [...prevTasks, task]);
  //     console.log("Fetched default task:", task);
  //   } catch (error) {
  //     console.error("Failed to fetch default task", error);
  //   }
  // };

  // 루틴을 추가하는 함수
  const addDefaultTask = async (catId) => {
    const task = {
      period_type: periodType,
      period_int: parseInt(repeatInterval, 10),
      note: note,
      cat_id: catId,
    };

    try {
      const createdTask = await taskApi.createDefaultTask(task);
      setDefaultTasks([...defaultTasks, createdTask]);
      console.log("Task successfully added:", createdTask);
      setNote("");
      setRepeatInterval("");
      setPeriodType("D");
    } catch (error) {
      console.error("Failed to add default task", error);
    }
  };

  // 루틴을 수정하는 함수
  const updateDefaultTask = async (id, taskData) => {
    try {
      const updatedTask = await taskApi.updateDefaultTask(id, taskData);
      setDefaultTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to update default task", error);
    }
  };

  // 루틴을 삭제하는 함수
  const deleteDefaultTask = async (taskId) => {
    try {
      await taskApi.deleteDefaultTask(taskId);
      setDefaultTasks(defaultTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete default task", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        defaultTasks,
        todayTasks,
        addTasks,
        upcomingTasks,
        isEditing,
        fetchTodayTasks,
        addTodayTask,
        deleteTodayTask,
        toggleTaskCompletion,
        // fetchUpcomingTasks,
        fetchDefaultTasks,
        addDefaultTask,
        updateDefaultTask,
        deleteDefaultTask,
        note,
        repeatInterval,
        periodType,
        updateNote,
        updateRepeatInterval,
        updatePeriodType,
        defaultTaskId,
        setDefaultTaskId,
        calendarTasks,
        fetchCalendarTasks,
        addCalendarTask,
        deleteCalendarTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
