import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale, // <-- Ensure this is imported
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale, // <-- Ensure this is imported for time scale functionality
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-date-fns"; // <-- Import date adapter for time scale

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale, // <-- Register LinearScale
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale, // <-- Register TimeScale for date handling
  annotationPlugin
);

const MoodChart = ({ data }) => {
  const [timeScale, setTimeScale] = useState("days");

  const getChartData = (scale) => {
    let range;
    switch (scale) {
      case "weeks":
        range = 30; // Show a month (30 days)
        break;
      case "months":
        range = 365; // Show a year (365 days)
        break;
      default:
        range = 14; // Show 2 weeks (14 days)
    }

    const chartData = [];
    for (let i = -range / 2; i <= range / 2; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const dateStr = currentDate.toISOString().split("T")[0];

      const entry = data.find((entry) => entry.date === dateStr);
      let burnoutScore = entry ? entry.burnoutScore : null;

      if (!burnoutScore && i > 0 && chartData.length > 0) {
        const previousScore = chartData[chartData.length - 1].burnoutScore;
        burnoutScore = Math.max(previousScore - 0.5, 0); // Gradual recovery
      }

      chartData.push({
        date: dateStr,
        burnoutScore: burnoutScore || 0,
      });
    }

    return {
      labels: chartData.map((entry) => entry.date),
      datasets: [
        {
          label: "Burnout Likelihood Over Time",
          data: chartData.map((entry) => entry.burnoutScore),
          fill: "start",
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderColor: "rgba(99, 102, 241, 1)",
          tension: 0.4,
        },
      ],
    };
  };

  const chartData = getChartData(timeScale);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Burnout Likelihood Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
        type: "time", // Use the time scale here
        time: {
          unit:
            timeScale === "days"
              ? "day"
              : timeScale === "weeks"
              ? "week"
              : "month",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md mt-8 p-6 w-full max-w-4xl">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-white ${
            timeScale === "days" ? "bg-blue-500" : "bg-gray-400"
          }`}
          onClick={() => setTimeScale("days")}
        >
          Days
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white ${
            timeScale === "weeks" ? "bg-blue-500" : "bg-gray-400"
          }`}
          onClick={() => setTimeScale("weeks")}
        >
          Weeks
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white ${
            timeScale === "months" ? "bg-blue-500" : "bg-gray-400"
          }`}
          onClick={() => setTimeScale("months")}
        >
          Months
        </button>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoodChart;
