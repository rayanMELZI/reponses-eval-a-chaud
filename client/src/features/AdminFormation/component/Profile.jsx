import style from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Profile du participant</h2>
      <div className={style.profile}>
        <div className={style.info}>
          <img src="Mask_group.svg" alt="profile" />
          <h3>Mohamed Larbi</h3>
        </div>
        <div className={style.details}>
          <div className={style.infoDetails}>
            <h4>Fonction :</h4>
            <span>Ingénieur Etudes et Développement Informatique</span>
          </div>
          <div className={style.infoDetails}>
            <h4>Service /Direction :</h4>
            <span>IT</span>
          </div>
          <div className={style.infoDetails}>
            <h4>Email :</h4>
            <span>admin@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
