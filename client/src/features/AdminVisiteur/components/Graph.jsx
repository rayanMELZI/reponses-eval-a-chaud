import React from "react";
import style1 from "./Graph.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
  },
};

function Graph({ statistics }) {
  const onlyStats = statistics.filter((stat) => {
    return stat.tauxSatis !== null;
  });

  const labels = onlyStats.map(
    (stat) => stat.title.slice(0, 6) + `${stat.title.length > 6 ? "..." : ""}`
  );
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Moyenne de satisfaction",
        data: onlyStats.map((stat) => stat.tauxSatis),
        borderColor: "#F29E4F",
        backgroundColor: "#fbead9",
      },
    ],
  };

  return (
    <div className={style1.container}>
      <p className={style1.text}>Statistiques des formations</p>
      <div className={style1.card}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Graph;
