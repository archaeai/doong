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

  const addDiaryEntry = async (entry) => {
    try {
      const newEntry = await diaryApi.createDiary(entry);
      setDiaryEntries((prevEntries) => [...prevEntries, newEntry]);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error("Failed to add diary entry:", error);
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
