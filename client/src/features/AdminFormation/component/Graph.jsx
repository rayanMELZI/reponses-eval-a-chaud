import React from "react";
import style1 from "./Graph.module.css";

function Graph() {
  return (
    <div className={style1.container}>
      <p className={style1.text}>Statistiques des formations</p>
      <div className={style1.card}></div>
    </div>
  );
}

export default Graph;
