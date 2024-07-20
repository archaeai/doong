import { createContext, useState } from "react";
import * as diaryApi from "../api/diaryApi";

export const DiaryContext = createContext({
  diaryEntries: [],
  fetchDiariesByCat: () => {},
  fetchDiaryByCatAndDate: () => {},
  addDiaryEntry: () => {},
  updateDiaryEntry: () => {},
  deleteDiaryEntry: () => {},
});

export const DiaryProvider = ({ children }) => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchDiariesByCat = async (catId) => {
    setIsLoading(true);
    try {
      const diaries = await diaryApi.getDiariesByCat(catId);
      setDiaryEntries(diaries);
      console.log("Fetched diaries:", diaries);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error("Failed to load diaries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiaryByCatAndDate = async (catId, date) => {
    setIsLoading(true);
    try {
      const entry = await diaryApi.getDiaryByCatAndDate(catId, date);
      setDiaryEntries(entry);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error("Failed to load diaries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDiaryEntry = async (diaryData) => {
    try {
      const newEntry = await diaryApi.createDiary(diaryData);
      console.log("New diary entry:", newEntry);
      setDiaryEntries((prevEntries) => {
        const updatedEntries = [...prevEntries, newEntry];
        return updatedEntries;
      });
      setIsError(false);
      return newEntry;
    } catch (error) {
      setIsError(true);
      if (error.response) {
        if (error.response.status === 422) {
          console.error("Validation error (422):", error.response.data);
        } else {
          console.error(
            "Server error:",
            error.response.status,
            error.response.data
          );
        }
      } else {
        console.error("Failed to add diary entry:", error.message);
      }
    }
  };

  const updateDiaryEntry = async (diaryId, updatedEntry) => {
    try {
      const updatedDiary = await diaryApi.updateDiary(diaryId, updatedEntry);
      setDiaryEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === diaryId ? updatedDiary : entry
        )
      );
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error("Failed to update diary entry:", error);
    }
  };

  const deleteDiaryEntry = async (diaryId) => {
    try {
      await diaryApi.deleteDiary(diaryId);
      setDiaryEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== diaryId)
      );
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error("Failed to delete diary entry:", error);
    }
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
        fetchDiariesByCat,
        fetchDiaryByCatAndDate,
        addDiaryEntry,
        updateDiaryEntry,
        deleteDiaryEntry,
        isLoading,
        isError,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
