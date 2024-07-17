import axios from "axios";
import { getToken } from "./userApi";

const API_BASE_URL = "http://127.0.0.1/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

const handleError = (error) => {
  console.error(error);
  throw new Error(
    error.response ? error.response.data.message : "Network Error"
  );
};

export const getDiariesByCat = async (catId, skip = 0, limit = 10) => {
  try {
    const response = await apiClient.get(`/diary/cat/${catId}`, {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getDiaryByCatAndDate = async (catId, date) => {
  try {
    const response = await apiClient.get(`/diary/cat/${catId}/date/${date}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createDiary = async (diary) => {
  try {
    const response = await apiClient.post("/diary/", diary);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateDiary = async (diaryId, diary) => {
  try {
    const response = await apiClient.put(`/diary/${diaryId}`, diary);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteDiary = async (diaryId) => {
  try {
    const response = await apiClient.delete(`/diary/${diaryId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
