import axios from "axios";
import { getToken } from "./userApi";

const API_BASE_URL = "http://127.0.0.1/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
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
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getDiaryByCatAndDate = async (catId, date) => {
  try {
    const response = await apiClient.get(`/diary/cat/${catId}/date/${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createDiary = async (diary) => {
  try {
    const formData = new FormData();
    Object.keys(diary).forEach((key) => {
      formData.append(key, diary[key]);
    });

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await apiClient.post("/diary/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateDiary = async (diaryId, diary) => {
  try {
    const response = await apiClient.put(`/diary/${diaryId}`, diary, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteDiary = async (diaryId) => {
  try {
    const response = await apiClient.delete(`/diary/${diaryId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
