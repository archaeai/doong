import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportLineChart({ report, year, month }) {
  if (!report || !report.pee_data || !report.poop_data || !report.weight_data) {
    return <div>데이터가 없습니다.</div>;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  const dateLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getMappedData = (data, key) => {
    return dateLabels.map((day) => {
      const dataEntry = data.find(
        (item) => new Date(item.date).getDate() === day
      );
      return dataEntry ? dataEntry[key] : null;
    });
  };

  const peeData = getMappedData(report.pee_data, "potato_count");
  const poopData = getMappedData(report.poop_data, "sweet_potato_count");
  const weightData = getMappedData(report.weight_data, "weight");

  const commonFontSettings = {
    family: "Gaegu",
    size: 14,
  };

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "몸무게",
        data: weightData,
        fill: false,
        borderColor: "#dff0e6",
        tension: 0.4,
        font: {
          family: "Gaegu",
        },
      },
      {
        label: "감자 갯수",
        data: peeData,
        borderColor: "#f9e4b7",
        fill: false,
      },
      {
        label: "맛동산 갯수",
        data: poopData,
        borderColor: "#f9d5e5",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          boxWidth: 20,
          padding: 15,
          font: commonFontSettings,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#2c3e50",
          font: commonFontSettings,
        },
      },
      y: {
        ticks: {
          color: "#2c3e50",
          font: commonFontSettings,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
