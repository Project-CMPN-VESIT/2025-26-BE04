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

// ✅ Register required elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ chartData, title }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title,
              font: { size: 18 },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {},
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
