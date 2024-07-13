import axios from "axios";

const API_URL = "http://your-backend-url/api/diary/";

export const getDiariesByUser = async (userId) => {
  const response = await axios.get(`${API_URL}user/${userId}`);
  return response.data;
};

export const getDiariesByUserAndDate = async (userId, date) => {
  const response = await axios.get(`${API_URL}user/${userId}/date/${date}`);
  return response.data;
};

export const createDiary = async (diary) => {
  const response = await axios.post(API_URL, diary);
  return response.data;
};

export const updateDiary = async (diaryId, diary) => {
  const response = await axios.put(`${API_URL}${diaryId}`, diary);
  return response.data;
};

export const deleteDiary = async (diaryId) => {
  const response = await axios.delete(`${API_URL}${diaryId}`);
  return response.data;
};
