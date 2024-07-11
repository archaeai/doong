// taskApi.js
import axios from "axios";
import { getToken } from "./userApi";

const API_BASE_URL = "http://127.0.0.1/api";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청마다 인증 헤더 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// default_task 관련 API(루틴)
export const getDefaultTasks = async (skip = 0, limit = 10) => {
  const response = await apiClient.get(`/default_task`, {
    params: { skip, limit },
  });
  return response.data;
};

export const getDefaultTask = async (id) => {
  const response = await apiClient.get(`/default_task/${id}`);
  return response.data;
};

export const createDefaultTask = async (taskData) => {
  const response = await apiClient.post(`/default_task`, taskData);
  return response.data;
};

export const updateDefaultTask = async (id, taskData) => {
  const response = await apiClient.put(`/default_task/${id}`, taskData);
  return response.data;
};

export const deleteDefaultTask = async (id) => {
  const response = await apiClient.delete(`/default_task/${id}`);
  return response.data;
};

// daily_task_log 관련 API(오늘할일)
export const getDailyTaskLogsByCat = async (catId) => {
  const response = await apiClient.get(`/daily_task_log/cat/`);
  return response.data;
};

//홈페이지에서 오늘 할 일을 페치
export const getTodayTasks = async (catId, date) => {
  const response = await apiClient.get(
    `/daily_task_log/cat/${catId}/date/${date}`
  );
  return response.data;
};

//홈페이지에서 오늘 할 일을 추가
export const addTodayTask = async (taskLogData) => {
  const response = await apiClient.post(`/daily_task_log/`, taskLogData);
  return response.data;
};

//홈페이지에서 오늘 할 일 완료 여부를 업데이트
export const updateTodayTask = async (id, taskLogData) => {
  const response = await apiClient.put(`/daily_task_log/${id}`, taskLogData);
  return response.data;
};

//홈페이지에서 오늘 할 일을 삭제
export const deleteTodayTask = async (id) => {
  const response = await apiClient.delete(`/daily_task_log/${id}`);
  return response.data;
};

// non_daily_task_log 관련 API(캘린더)
export const getNonDailyTaskLogsByCat = async (catId) => {
  const response = await apiClient.get(`/non_daily_task_log/cat/${catId}`);
  return response.data;
};

export const createNonDailyTaskLog = async (taskLogData) => {
  const response = await apiClient.post(`/non_daily_task_log`, taskLogData);
  return response.data;
};

export const updateNonDailyTaskLog = async (id, taskLogData) => {
  const response = await apiClient.put(
    `/non_daily_task_log/${id}`,
    taskLogData
  );
  return response.data;
};

export const deleteNonDailyTaskLog = async (id) => {
  const response = await apiClient.delete(`/non_daily_task_log/${id}`);
  return response.data;
};
