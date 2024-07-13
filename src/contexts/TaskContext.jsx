import React, { createContext, useContext, useState, useEffect } from "react";
import * as taskApi from "../api/taskApi";

export const TaskContext = createContext();

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [defaultTaskId, setDefaultTaskId] = useState(null);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [addTasks, setAddTasks] = useState([]); //추가할일
  const [todayTasks, setTodayTasks] = useState([]); //오늘할일
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [statistics, setStatistics] = useState({});
  // 루틴 추가 폼 상태
  const [note, setNote] = useState("");
  const [repeatInterval, setRepeatInterval] = useState("");
  const [periodType, setPeriodType] = useState("days"); // 기본값을 "days"로 설정
  // 상태 업데이트 함수
  const updateNote = (value) => setNote(value);
  const updateRepeatInterval = (value) => setRepeatInterval(value);
  const updatePeriodType = (value) => setPeriodType(value);

  //홈페이지 오늘할일 API 함수
  // 오늘의 할 일을 API에서 불러오는 함수
  const fetchTodayTasks = async (catId, date) => {
    try {
      const tasks = await taskApi.getTodayTasks(catId, date);
      setTodayTasks(tasks);
      console.log("Fetched today tasks:", tasks); // 로그 추가
    } catch (error) {
      console.error("Failed to fetch today tasks", error);
    }
  };

  // 비규칙적인 이벤트를 API에서 불러오는 함수
  const fetchCalendarTasks = async (catId) => {
    try {
      const tasks = await taskApi.getNonDailyTaskLogsByCat(catId);
      setCalendarTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch calendar tasks", error);
    }
  };

  // 다가오는 일정을 API에서 불러오는 함수
  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const tasks = await taskApi.getNonDailyTaskLogsByCat(1); // catId는 예시
        setUpcomingTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch upcoming tasks", error);
      }
    };
    fetchUpcomingTasks();
  }, []);

  const fetchUpcomingTasks = async (catId) => {
    try {
      const tasks = await taskApi.getNonDailyTaskLogsByCat(catId);
      setUpcomingTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch upcoming tasks", error);
    }
  };

  // 홈페이지에서 오늘 할 일 추가
  const addTodayTask = async (task) => {
    try {
      const createdTask = await taskApi.addTodayTask(task);
      setTodayTasks([...todayTasks, createdTask]);
      console.log("Added task:", createdTask); // 로그 추가
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const updateTodayTask = async (id, task) => {
    try {
      const updatedTask = await taskApi.updateTodayTask(id, task);
      setTodayTasks(todayTasks.map((t) => (t.id === id ? updatedTask : t)));
      console.log("Updated task:", updatedTask); // 로그 추가
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const deleteTodayTask = async (id) => {
    try {
      await taskApi.deleteTodayTask(id);
      setTodayTasks(todayTasks.filter((task) => task.id !== id));
      console.log("Deleted task with id:", id); // 로그 추가
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  // 할 일 완료 여부를 토글하는 함수
  const toggleTaskCompletion = async (id) => {
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
  };

  // 새로운 비규칙적인 이벤트를 추가하는 함수
  const addCalendarTask = async (task) => {
    try {
      const createdTask = await taskApi.createNonDailyTaskLog(task);
      setCalendarTasks([...calendarTasks, createdTask]);
    } catch (error) {
      console.error("Failed to add calendar task", error);
    }
  };

  //루틴설정페이지 API 함수
  //{default_task_id} 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await taskApi.getAllDefaultTasks();
        setDefaultTasks(tasks);
        if (tasks.length > 0) {
          setDefaultTaskId(tasks[0].id); // 첫 번째 기본 작업의 ID를 추출하여 상태에 저장
          fetchDefaultTasks(tasks[0].id); // 첫 번째 기본 작업의 ID로 기본 작업을 가져옴
        }
      } catch (error) {
        console.error("Failed to fetch default tasks", error);
      }
    };

    fetchData();
  }, []);

  // 루틴을 API에서 불러오는 함수
  const fetchDefaultTasks = async (id) => {
    try {
      const task = await taskApi.getDefaultTasks(id);
      setDefaultTasks((prevTasks) => [...prevTasks, task]);
      console.log("Fetched default task:", task); // 콘솔 로그 추가
    } catch (error) {
      console.error("Failed to fetch default task", error);
    }
  };

  // 루틴을 추가하는 함수
  const addDefaultTask = async () => {
    const task = {
      period_type: periodType,
      period_int: parseInt(repeatInterval, 10),
      note: note,
    };

    try {
      const createdTask = await taskApi.createDefaultTask(task);
      setDefaultTasks([...defaultTasks, createdTask]);
      console.log("Task successfully added:", createdTask); // 콘솔 로그 추가
      setNote("");
      setRepeatInterval("");
      setPeriodType("days");
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
        calendarTasks,
        upcomingTasks,
        isEditing,
        fetchTodayTasks,
        addTodayTask,
        updateTodayTask,
        deleteTodayTask,
        toggleTaskCompletion,
        fetchCalendarTasks,
        fetchUpcomingTasks,
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
