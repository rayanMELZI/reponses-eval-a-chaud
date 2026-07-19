import style from "./Profile.module.css";

export default function Profile() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className={style.container}>
      <h2 className={style.title}>Profile du participant</h2>
      <div className={style.profile}>
        <div className={style.info}>
          <img src="/Mask_group.svg" alt="profile" />
          <h3>
            {userData.prenom} {userData.nom}
          </h3>
        </div>
        <div className={style.details}>
          <div className={style.infoDetails}>
            <h4>Fonction :</h4>
            <span>{userData.fonction}</span>
          </div>
          <div className={style.infoDetails}>
            <h4>Structure :</h4>
            <span>{userData.structureID}</span>
          </div>
          <div className={style.infoDetails}>
            <h4>Email :</h4>
            <span>{userData.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
