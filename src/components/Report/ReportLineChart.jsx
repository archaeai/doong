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

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#dff0e6",
        pointBorderColor: "#bde0fe",
        tension: 0.1,
        font: {
          family: "Gaegu",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 20,
          padding: 15,
          font: {
            family: "Gaegu",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "몸무게 변화",
        align: "start",
        color: "#2c3e50",
        font: {
          family: "Gaegu",
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#2c3e50",
          font: {
            family: "Gaegu",
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: "#2c3e50",
          font: {
            family: "Gaegu",
            size: 14,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ReportLineChart;
