import { createContext, useState, useCallback, useEffect } from "react";
import {
  fetchCatProfiles as fetchCatProfilesApi,
  addCatProfile as addCatProfileApi,
  updateCatProfile as updateCatProfileApi,
  deleteCatProfile as deleteCatProfileApi,
} from "../api/catApi";

export const CatContext = createContext({
  cats: [],
  selectedCat: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  addCat: () => {},
  selectCat: () => {},
  loadCats: () => {},
  updateCat: () => {},
  deleteCat: () => {},
});

export const CatProvider = ({ children }) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(() => {
    const savedCat = localStorage.getItem("selectedCat");
    return savedCat ? JSON.parse(savedCat) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadCats = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    try {
      const data = await fetchCatProfilesApi();
      setCats(data);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCat = useCallback(async (catData) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    try {
      const newCat = await addCatProfileApi(catData);
      console.log("New Cat added:", newCat);
      setCats((prevCats) => {
        const updatedCats = [...prevCats, newCat];
        localStorage.setItem("cats", JSON.stringify(updatedCats));
        return updatedCats;
      });
      setSelectedCat(newCat);
      return newCat;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCat = useCallback(
    async (catId, catData) => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");
      try {
        const updatedCat = await updateCatProfileApi(catId, catData);
        setCats((prevCats) =>
          prevCats.map((cat) => (cat.id === catId ? updatedCat : cat))
        );
        if (selectedCat && selectedCat.id === catId) {
          setSelectedCat(updatedCat);
        }
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCat?.id]
  );

  const deleteCat = useCallback(
    async (catId) => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");
      try {
        await deleteCatProfileApi(catId);
        setCats((prevCats) => prevCats.filter((cat) => cat.id !== catId));
        if (selectedCat && selectedCat.id === catId) {
          setSelectedCat(null);
        }
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCat?.id]
  );

  const selectCat = useCallback((cat) => {
    setSelectedCat(cat);
  }, []);

  return (
    <CatContext.Provider
      value={{
        cats,
        selectedCat,
        isLoading,
        isError,
        errorMessage,
        addCat,
        selectCat,
        loadCats,
        updateCat,
        deleteCat,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};
