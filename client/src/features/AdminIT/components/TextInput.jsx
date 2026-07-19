import React from "react";
import style from "./TextInput.module.css";

function TextInput({ label, isPeriode, isPrdLabel }) {
  return (
    <div className={style.container}>
      <label className={style.label} htmlFor="">
        {label}
      </label>

      {isPeriode === true ? (
        <div className={style.isPeriod}>
          <label className={style.label} htmlFor="">
            {isPrdLabel}
          </label>
          <input className={style.input} type="date" name="" id="" />
        </div>
      ) : (
        <input className={style.input} type="text" name="" id="" />
      )}
    </div>
  );
}

export default TextInput;
