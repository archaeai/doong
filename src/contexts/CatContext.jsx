import { createContext, useState } from "react";

export const CatContext = createContext({
  cats: [],
  addCat: () => {},
});

export const CatProvider = ({ children }) => {
  const [cats, setCats] = useState([]);

  const addCat = (cat) => {
    setCats((prevCats) => [...prevCats, cat]);
  };

  return (
    <CatContext.Provider value={{ cats, addCat }}>
      {children}
    </CatContext.Provider>
  );
};
