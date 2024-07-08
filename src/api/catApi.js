import axios from "axios";
import { getToken } from "./userApi";

const API_URL = "http://127.0.0.1/api";

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

  const response = await axios.post(
    `${API_URL}/cat_profiles/?${params}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (!response.status === 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

export const fetchCatData = async (addCat) => {};
