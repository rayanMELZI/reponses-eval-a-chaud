import React from "react";
import style from "./TextInput.module.css";

function TextInput({
  label,
  isPeriode,
  isPrdLabel,
  name,
  value,
  onChange,
  isDisabled,
}) {
  // console.log(isDisabled);
  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={name ? name : null}>
        {label}
      </label>

      {isPeriode === true ? (
        <div className={style.isPeriod}>
          <label className={style.label} htmlFor="">
            {isPrdLabel}
          </label>
          <input
            className={style.input}
            type="date"
            name={name ? name : null}
            id={name ? name : null}
            value={value ? value : ""}
            onChange={onChange ? onChange : null}
            disabled={isDisabled}
          />
        </div>
      ) : (
        <input
          className={style.input}
          type="text"
          name={name ? name : null}
          id={name ? name : null}
          value={value ? value : ""}
          onChange={onChange ? onChange : null}
          disabled={isDisabled}
        />
      )}
    </div>
  );
}

export default TextInput;
