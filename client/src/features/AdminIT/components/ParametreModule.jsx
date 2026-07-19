import style from "./ParametreModule.module.css";
import Button from "./Button";

import { useEffect, useState } from "react";
export default function ParametreModule({
  toggleId,
  title,
  inputName1,
  value1,
  inputName2,
  value2,
  inputName3,
  value3,
  inputName4,
  value4,
  disabled4,
  inputName5,
  value5,
  inputName6,
  value6,
  mainBtn,
  mainBtnStyle,
  onMainBtnClick,
  secondBtn,
  secondBtnStyle,
  onSecondBtnClick,
  onSubmit,
}) {
  const [input1, setInput1] = useState(value1 || "");
  const [input2, setInput2] = useState(value2 || "");
  const [input3, setInput3] = useState(value3 || "");
  const [input4, setInput4] = useState(value4 || "");
  const [input5, setInput5] = useState(value5 || "");
  const [input6, setInput6] = useState(value6 || "");

  useEffect(() => {
    setInput1(value1);
    setInput2(value2);
    setInput3(value3);
    setInput4(value4);
    setInput5(value5);
    setInput6(value6);
  }, [value1, value2, value3, value4, value5, value6]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className={style.container} id={toggleId}>
      <h2 className={style.title}>{title}</h2>
      <form
        className={style.card}
        id="informations_personnel"
        onSubmit={onSubmit}
      >
        <div className={style.row}>
          <div className={style.col}>
            <label htmlFor={inputName1}>{inputName1}</label>
            <input
              type="text"
              id={inputName1}
              className={style.input}
              value={input1 || ""}
              onChange={handleInputChange(setInput1)}
            />
          </div>
          {inputName2 !== undefined && (
            <div className={style.col}>
              <label htmlFor={inputName2}>{inputName2}</label>
              <input
                type="text"
                id={inputName2}
                className={style.input}
                value={input2 || ""}
                onChange={handleInputChange(setInput2)}
              />
            </div>
          )}
        </div>
        {inputName3 !== undefined && (
          <div className={style.row}>
            <div className={style.col}>
              <label htmlFor={inputName3}>{inputName3}</label>
              <input
                type="text"
                id={inputName3}
                className={style.input}
                value={input3 || ""}
                onChange={handleInputChange(setInput3)}
              />
            </div>
            {inputName4 !== undefined && (
              <div className={style.col}>
                <label htmlFor={inputName4}>{inputName4}</label>
                <input
                  type="text"
                  id={inputName4}
                  className={style.input}
                  value={input4 || ""}
                  onChange={handleInputChange(setInput4)}
                  disabled={disabled4 !== undefined ? disabled4 : false}
                />
              </div>
            )}
          </div>
        )}

        {inputName5 !== undefined && (
          <div className={style.row}>
            <div className={style.col}>
              <label htmlFor={inputName5}>{inputName5}</label>
              <input
                type="text"
                id={inputName5}
                className={style.input}
                value={input5 || ""}
                onChange={handleInputChange(setInput5)}
              />
            </div>
            {inputName6 !== undefined && (
              <div className={style.col}>
                <label htmlFor={inputName6}>{inputName6}</label>
                <input
                  type="text"
                  id={inputName6}
                  className={style.input}
                  value={input6 || ""}
                  onChange={handleInputChange(setInput6)}
                />
              </div>
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {secondBtn !== undefined && (
            <Button
              content={secondBtn}
              btnStyle={secondBtnStyle !== undefined && secondBtnStyle}
              onClick={onSecondBtnClick !== undefined && onSecondBtnClick}
            />
          )}
          <Button
            content={mainBtn !== undefined ? mainBtn : "Enregistrer"}
            btnStyle={mainBtnStyle !== undefined && mainBtnStyle}
            onClick={onMainBtnClick !== undefined && onMainBtnClick}
          />
        </div>
      </form>
    </div>
  );
}
