import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const CatContext = createContext({
  cats: [],
  addCat: () => {},
  selectCat: () => {},
  selectedCat: null,
});

export const CatProvider = ({ children }) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const addCat = (cat) => {
    const newCat = { ...cat, id: uuidv4() };
    setCats((prevCats) => [...prevCats, newCat]);
    setSelectedCat(newCat);
  };

  const selectCat = (cat) => {
    setSelectedCat(cat);
  };

  return (
    <CatContext.Provider value={{ cats, addCat, selectCat, selectedCat }}>
      {children}
    </CatContext.Provider>
  );
};
