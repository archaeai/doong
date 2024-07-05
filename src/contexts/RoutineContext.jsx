import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const RoutineContext = createContext();

export const RoutineProvider = ({ children }) => {
  const [dailyRoutines, setDailyRoutines] = useState([
    { id: 1, task: "밥", done: false },
    { id: 2, task: "물", done: false },
    { id: 3, task: "화장실 청소", done: false },
    { id: 4, task: "바닥 청소", done: false },
    { id: 5, task: "사냥놀이 15분", done: false },
    { id: 6, task: "빗질", done: false },
    { id: 7, task: "양치", done: false },
    { id: 8, task: "사냥놀이 15분", done: false },
  ]);

  const [addTodos, setAddTodos] = useState([]);
  const [upcomingTodos, setUpcomingTodos] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);
  const [monthlyRoutines, setMonthlyRoutines] = useState([]);
  const [statistics, setStatistics] = useState({});

  // 데일리 루틴 추가 함수(설정페이지에서 추가)
  const addDailyRoutine = (newRoutine) => {
    const newId = dailyRoutines.length
      ? dailyRoutines[dailyRoutines.length - 1].id + 1
      : 1;
    setDailyRoutines([
      ...dailyRoutines,
      { id: newId, task: newRoutine, done: false },
    ]);
  };

  // 데일리 루틴 텍스트 수정 함수(설정페이지에서 수정)
  const updateDailyRoutine = (id, newText) => {
    const updatedRoutines = dailyRoutines.map((routine) =>
      routine.id === id ? { ...routine, task: newText } : routine
    );
    setDailyRoutines(updatedRoutines);
  };

  // 할 일 완료 상태 업데이트 함수
  const toggleTodoCompletion = (todoType, id) => {
    let updatedTodos;
    if (todoType === "daily") {
      updatedTodos = dailyRoutines.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      setDailyRoutines(updatedTodos);
    } else if (todoType === "custom") {
      updatedTodos = addTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      setAddTodos(updatedTodos);
    } else if (todoType === "today") {
      updatedTodos = todayTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      setTodayTodos(updatedTodos);
    }
  };

  // 사용자 추가 할 일 추가 함수
  const addCustomTodo = (newTodo) => {
    const newId = addTodos.length ? addTodos[addTodos.length - 1].id + 1 : 1000;
    setAddTodos([...addTodos, { id: newId, task: newTodo, done: false }]);
  };

  // 다가오는 일정 업데이트 함수
  const addUpcomingTodo = (newTodo) => {
    setUpcomingTodos([...upcomingTodos, newTodo]);
  };

  // 월간 루틴 추가 함수
  const addMonthlyRoutine = (newRoutine) => {
    setMonthlyRoutines([...monthlyRoutines, newRoutine]);
  };

  // 통계 업데이트 함수
  const updateStatistics = (newStats) => {
    setStatistics(newStats);
  };

  // 오늘 할 일 자동 업데이트 (예시, 실제로는 더 복잡한 로직 필요)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const newTodayTodos = upcomingTodos.filter((todo) => todo.date === today);
    setTodayTodos([...dailyRoutines, ...newTodayTodos]);
  }, [dailyRoutines, addTodos, upcomingTodos]);

  return (
    <RoutineContext.Provider
      value={{
        dailyRoutines,
        addTodos,
        upcomingTodos,
        todayTodos,
        monthlyRoutines,
        statistics,
        addDailyRoutine,
        addCustomTodo,
        updateDailyRoutine,
        toggleTodoCompletion,
        addUpcomingTodo,
        addMonthlyRoutine,
        updateStatistics,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};
