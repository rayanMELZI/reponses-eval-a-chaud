import style from "./Footer.module.css";
export default function Footer({ change }) {
  return (
    <div className={`${style.container} ${change ? style.change : ""}`}>
      <span>
        FormEval • Plateforme d'évaluation des formations
      </span>
      <button className={style.button}>Contact</button>
    </div>
  );
}
