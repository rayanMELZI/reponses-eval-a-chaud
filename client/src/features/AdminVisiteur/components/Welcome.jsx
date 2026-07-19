import style from "./Welcome.module.css";

export default function Welcome({ content }) {
  return (
    <div className={style.welcome}>
      <div className={style.container}>
        <p className={style.text}>{content}</p>
      </div>
    </div>
  );
}
