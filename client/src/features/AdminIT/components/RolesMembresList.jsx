import style from "./RolesMembresList.module.css";
import TableRow from "./TableRow";
import React from "react";

export default function RolesMembresList({ columns, propData }) {
  return (
    <div className={style.container}>
      <ul className={style.info} style={{ "--number": columns.length + 1 }}>
        {columns === undefined ? null : (
          <>
            {columns.map((col, i) => (
              <li key={i}>{col}</li>
            ))}
          </>
        )}
      </ul>
      <div
        className={style.detailsContainer}
        style={{
          height: "calc(100% - 60px)",
          maxHeight: "calc(100% - 60px)",
        }}
      >
        {propData === undefined
          ? null
          : propData.map((e, i) => (
              <div
                className={style.details}
                key={i}
                style={{
                  "--color": "#B1B5B8",
                  border: `solid #B1B5B8 1px`,
                  padding: "5px 10px",
                }}
              >
                <div className={style.item}>{e.nom}</div>
                <div className={style.item}>{e.prenom}</div>
                <div className={style.item}>
                  {e.roles.map((role, i) => {
                    return i === 0 ? (
                      role
                    ) : (
                      <React.Fragment key={i}>
                        <br />
                        {role}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className={style.item} style={{ justifySelf: "center" }}>
                  {e.action}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
