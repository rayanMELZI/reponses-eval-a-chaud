import style from "./Welcome.module.css";

export default function Welcome({ content,change }) {
  return (
    <div className={`${style.welcome} ${change ? style.change : ""}`}>
      <div className={style.container}>
        <p className={style.text}>{content}</p>
      </div>
    </div>
  );
}
