import { useState, useEffect } from "react";
import { getFormattedCurrentDate } from "../utils/dateUtil";

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = getFormattedCurrentDate();
    setCurrentDate(date);
  }, []);

  return currentDate;
};

export default useCurrentDate;
