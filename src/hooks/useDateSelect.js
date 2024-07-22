import { useState } from "react";

const useDateSelect = (initialYear, initialMonth) => {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const years = ["2024", "2023", "2022"];
  const months = [
    { value: "01", label: "1월" },
    { value: "02", label: "2월" },
    { value: "03", label: "3월" },
    { value: "04", label: "4월" },
    { value: "05", label: "5월" },
    { value: "06", label: "6월" },
    { value: "07", label: "7월" },
    { value: "08", label: "8월" },
    { value: "09", label: "9월" },
    { value: "10", label: "10월" },
    { value: "11", label: "11월" },
    { value: "12", label: "12월" },
  ];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return {
    selectedYear,
    selectedMonth,
    years,
    months,
    handleYearChange,
    handleMonthChange,
  };
};

export default useDateSelect;
