import style from "./InfoPersonnel.module.css";
import Button from "./Button";
export default function InfoPersonnel() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Modifier le profil</h2>
      <form className={style.card} id="informations_personnel">
        <div className={style.row}>
          <div className={style.col}>
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" className={style.input}/>
          </div>
          <div className={style.col}>
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" />
          </div>
        </div>
        <div className={style.row}>
          <div className={style.col}>
            <label htmlFor="fonction">Fonction</label>
            <input type="text" id="fonction" />
          </div>
          <div className={style.col}>
            <label htmlFor="service">Service /Direction</label>
            <input type="text" id="service" />
          </div>
        </div>
        <Button content="Enregistrer"/>
      </form>
    </div>
  );
}
