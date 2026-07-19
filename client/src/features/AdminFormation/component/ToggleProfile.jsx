import style from "./ToggleProfile.module.css";
export default function ToggleProfile() {
  return (
    <div className={style.container}>
      <h3 className={style.active}>Profile</h3>
      <h3>Application</h3>
    </div>
  );
}
