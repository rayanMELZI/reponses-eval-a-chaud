import React from "react";
import style from "./UserType.module.css";

function UserType({ type }) {
  return (
    <div className={style.container}>
      <span
        className={
          type !== undefined && type === "LDAP"
            ? style.membreLDAP
            : style.membreLocal
        }
      >
        {type}
      </span>
    </div>
  );
}

export default UserType;
