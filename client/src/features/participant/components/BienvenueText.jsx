import style from "./BienvenueText.module.css";
export default function BienvenueText() {
  return (
    <div className={style.contenu}>
      <h3 className={style.titre}>Questionnaire</h3>
      <h3 className={style.text}>
        Merci de prendre quelques minutes pour compléter ce questionnaire. Vos retours nous aideront à améliorer la qualité de nos prochaines sessions de formation.
      </h3>
    </div>
  );
}
