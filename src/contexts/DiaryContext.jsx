import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getDiariesByUser,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../api/diaryApi";

export const DiaryContext = createContext({
  diaryEntries: [],
  addDiaryEntry: () => {},
  updateDiaryEntry: () => {},
  deleteDiaryEntry: () => {},
  loadDiaries: () => {},
});

export const DiaryProvider = ({ children }) => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadDiaries = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const diaries = await getDiariesByUser("user-id");
        setDiaryEntries(diaries);
      } catch (error) {
        setIsError(true);
        console.error("Failed to load diaries:", error);
      }
      setIsLoading(false);
    };

    loadDiaries();
  }, []);

  const addDiaryEntry = async (entry) => {
    try {
      const newEntry = await createDiary(entry);
      setDiaryEntries((prevEntries) => [...prevEntries, newEntry]);
    } catch (error) {
      console.error("Failed to add diary entry:", error);
    }
  };

  const updateDiaryEntry = async (id, updatedEntry) => {
    try {
      const updatedDiary = await updateDiary(id, updatedEntry);
      setDiaryEntries((prevEntries) =>
        prevEntries.map((entry) => (entry.id === id ? updatedDiary : entry))
      );
    } catch (error) {
      console.error("Failed to update diary entry:", error);
    }
  };

  const deleteDiaryEntry = async (id) => {
    try {
      await deleteDiary(id);
      setDiaryEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete diary entry:", error);
    }
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
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
