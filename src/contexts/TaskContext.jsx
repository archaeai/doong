import React, { createContext, useContext, useState, useEffect } from "react";
import * as taskApi from "../api/taskApi";

export const TaskContext = createContext();

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  // 상태 관리 변수들
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [addTasks, setAddTasks] = useState([]);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statistics, setStatistics] = useState({});

  // 폼을 여는 함수
  const openForm = () => setIsFormVisible(true);

  // 폼을 닫는 함수
  const closeForm = () => setIsFormVisible(false);

  // 기본 루틴을 API에서 불러오는 함수
  const fetchDefaultTasks = async () => {
    try {
      const tasks = await taskApi.getDefaultTasks();
      setDefaultTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch default tasks", error);
    }
  };

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

  // 기본 루틴을 추가하는 함수
  const addDefaultTask = async (task) => {
    try {
      const createdTask = await taskApi.createDefaultTask(task);
      setDefaultTasks([...defaultTasks, createdTask]);
    } catch (error) {
      console.error("Failed to add default task", error);
    }
  };

  // 기본 루틴을 업데이트하는 함수
  const updateDefaultTask = async (taskId, task) => {
    try {
      const updatedTask = await taskApi.updateDefaultTask(taskId, task);
      setDefaultTasks(
        defaultTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error("Failed to update default task", error);
    }
  };

  // 기본 루틴을 삭제하는 함수
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
        isFormVisible,
        isEditing,
        openForm,
        closeForm,
        addTodayTask,
        updateTodayTask,
        deleteTodayTask,
        toggleTaskCompletion,
        fetchTodayTasks,
        fetchCalendarTasks,
        fetchUpcomingTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
