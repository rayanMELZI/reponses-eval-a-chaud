import style from "./Button.module.css";

export default function Button({ content, onClick, btnStyle }) {
  return (
    <button
      className={
        btnStyle === undefined
          ? style.btn
          : btnStyle === "minimal"
          ? style.minimal
          : btnStyle === "white"
          ? style.white
          : style.btn
      }
      onClick={onClick}
    >
      {content}
    </button>
  );
}
