import style from "./Satisfaction.module.css";

export default function Satisfaction() {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h3>
          Merci d'exprimer votre degré de satisfaction en indiquant la note de
          votre choix selon la grille suivante :
        </h3>
        <ul>
            <li>1.Insatisfait</li>
            <li>2.Peut satisfait</li>
            <li>3.Satisfait</li>
            <li>4.Trés satisfait</li>
        </ul>
      </div>
    </div>
  );
}
