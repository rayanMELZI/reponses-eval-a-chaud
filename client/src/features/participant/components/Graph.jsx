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
import { faker } from "@faker-js/faker";

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

const labels = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  // "Septembre",
  // "Octobre",
  // "Novembre",
  // "Décembre",
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      borderColor: "#F29E4F",
      backgroundColor: "#fbead9",
    },
  ],
};

function Graph() {
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
