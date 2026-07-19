import React, { useEffect } from "react";

function TauxDeSatisfaction({ taux, bottom }) {
  return (
    <div
      style={{
        textAlign: "center",
        margin: `${bottom ? "30px 0 0" : "0 0 40px"}`,
        fontWeight: "bold",
      }}
    >
      Taux de satisfaction: {taux}%
    </div>
  );
}

export default TauxDeSatisfaction;
