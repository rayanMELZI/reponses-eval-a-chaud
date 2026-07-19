import style from "./Button.module.css";

export default function Button({ content }) {
  return <button className={style.btn}>{content}</button>;
}
