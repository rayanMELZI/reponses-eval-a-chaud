import style from "./EditProfile.module.css";
import Button from "./Button";
export default function EditProfile() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Modifier le profil</h2>
      <form action="POST" className={style.form}>
        <label htmlFor="email">Email</label>
        <input type="email" className={style.input} id="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" className={style.input} id="password" />
        <Button/>
      </form>
    </div>
  );
}
