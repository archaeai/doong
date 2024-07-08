import axios from "axios";
import { getToken } from "./userApi";

const API_URL = "http://127.0.0.1/api/cat_profiles/";

export const fetchCatProfiles = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(API_URL + "user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addCatProfile = async (data) => {
  const token = getToken();

  const params = new URLSearchParams({
    name: data.name,
    breed: data.breed,
    gender: data.gender,
    birthday: data.birthDate,
    adopted_day: data.adoptDate,
    vaccine_date: data.vaccinationDate,
    heart_warm_date: data.heartwormDate,
    litter_date: data.litterDate,
    neutered: data.neutered,
    weight: data.weight,
  }).toString();

  const formData = new FormData();
  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const response = await axios.post(`${API_URL}?${params}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.status === 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

export const updateCatProfile = async (catId, catData) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}${catId}`, catData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to update cat profile");
  }

  return response.data;
};

export const deleteCatProfile = async (catId) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}${catId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete cat profile");
  }

  return response.data;
};
