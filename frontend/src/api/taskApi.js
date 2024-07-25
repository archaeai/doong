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

// default_task 관련 API(설정페이지의 루틴 설정)
export const getAllDefaultTasks = async (catId, skip = 0, limit = 20) => {
  try {
    const response = await apiClient.get(`/default_task/${catId}`, {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch default tasks");
  }
};

export const getDefaultTask = async (id) => {
  try {
    const response = await apiClient.get(`/default_task/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch default task");
  }
};

export const createDefaultTask = async (taskData) => {
  try {
    const response = await apiClient.post(`/default_task/`, taskData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add default task");
  }
};

export const updateDefaultTask = async (id, taskData) => {
  try {
    const response = await apiClient.put(`/default_task/${id}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update default task");
  }
};

export const deleteDefaultTask = async (id) => {
  try {
    const response = await apiClient.delete(`/default_task/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete default task");
  }
};

// daily_task_log 관련 API(홈페이지의 오늘할일)
// export const getDailyTaskLogsByCat = async (catId) => {
//   const response = await apiClient.get(`/daily_task_log/cat/`);
//   return response.data;
// };

export const getTodayTasks = async (catId, date) => {
  const response = await apiClient.get(
    `/daily_task_log/cat/${catId}/date/${date}`
  );
  return response.data;
};

export const addTodayTask = async (taskLogData) => {
  const response = await apiClient.post(`/daily_task_log/`, taskLogData);
  return response.data;
};

export const updateTodayTask = async (id, taskLogData) => {
  const response = await apiClient.put(`/daily_task_log/${id}`, taskLogData);
  return response.data;
};

export const deleteTodayTask = async (task_id) => {
  const response = await apiClient.delete(`/daily_task_log/${task_id}`);
  return response.data;
};

// non_daily_task_log 관련 API(캘린더 페이지)
export const getNonDailyTaskLogs = async (catId) => {
  try {
    const response = await apiClient.get(`/non_daily_task_log/cat/${catId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch non-daily task logs");
  }
};

export const getNonDailyTaskLogsByDate = async (catId, date) => {
  try {
    const response = await apiClient.get(
      `/non_daily_task_log/cat/${catId}/date/${date}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch non-daily task logs");
  }
};

export const getNonDailyTaskLogsUpcoming = async (catId) => {
  try {
    const response = await apiClient.get(
      `/non_daily_task_log/upcoming/${catId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch non-daily task logs");
  }
};

export const getNonDailyTaskLogsRecentDone = async (catId) => {
  try {
    const response = await apiClient.get(
      `/non_daily_task_log/recent_done/${catId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch non-daily task logs");
  }
};

export const createNonDailyTaskLog = async (taskLogData) => {
  try {
    const response = await apiClient.post(`/non_daily_task_log/`, taskLogData);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create non-daily task log:",
      error.response?.data || error.message
    );
    throw new Error("Failed to add non-daily task log");
  }
};

export const updateNonDailyTaskLog = async (id, taskLogData) => {
  const response = await apiClient.put(
    `/non_daily_task_log/${id}`,
    taskLogData
  );
  return response.data;
};

export const deleteNonDailyTaskLog = async (id) => {
  try {
    const response = await apiClient.delete(`/non_daily_task_log/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete non-daily task log");
  }
};