import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const DiaryContext = createContext({
  diaryEntries: [],
  addDiaryEntry: () => {},
});

export const DiaryProvider = ({ children }) => {
  const [diaryEntries, setDiaryEntries] = useState([]);

  const addDiaryEntry = (entry) => {
    const newEntry = { ...entry, id: uuidv4() };
    setDiaryEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <DiaryContext.Provider value={{ diaryEntries, addDiaryEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};
