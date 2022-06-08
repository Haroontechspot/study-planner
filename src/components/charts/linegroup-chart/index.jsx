import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Linegroupchart({ datasets, labels, title = "Daily Reports" }) {
  const ref = useRef(null);

  const data = { labels, datasets };
  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 16,
          stepSize: 2,
        },
      },
    },
  };

  useEffect(() => {
    let lineChart = ref?.chartInstance;
    if (lineChart) {
      lineChart.update();
    }
  }, [data]);

  return <Bar ref={ref} options={options} data={data} />;
}
