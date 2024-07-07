import { createContext, useState, useCallback } from "react";

export const CatContext = createContext({
  cats: [],
  addCat: () => {},
  selectCat: () => {},
  selectedCat: null,
});

export const CatProvider = ({ children }) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const addCat = useCallback((cat) => {
    setCats((prevCats) => {
      const exists = prevCats.some((existingCat) => existingCat.id === cat.id);
      if (exists) {
        return prevCats;
      }
      return [...prevCats, cat];
    });
    setSelectedCat(cat);
  }, []);

  const selectCat = useCallback((cat) => {
    setSelectedCat(cat);
  }, []);

  return (
    <CatContext.Provider value={{ cats, addCat, selectCat, selectedCat }}>
      {children}
    </CatContext.Provider>
  );
};
