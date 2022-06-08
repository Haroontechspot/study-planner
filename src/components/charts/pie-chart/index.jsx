import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    let chart = ref?.chartInstance;
    if (chart) {
      chart.update();
    }
  }, [data]);
  return <Pie data={data} />;
};
