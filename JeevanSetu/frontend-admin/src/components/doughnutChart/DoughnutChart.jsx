import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// ✅ Register required chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function DoughnutChart({ chartData, title }) {
  return (
    <div className="chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: title,
              font: {
                size: 18,
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default DoughnutChart;
