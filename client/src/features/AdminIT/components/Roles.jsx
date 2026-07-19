import React from "react";
import style from "./Roles.module.css";
import Titre from "./Titre";

const roles = ["Participant", "Admin Formation", "Admin IT", "Admin Visiteur"];

function Roles({ roleFilter, setRoleFilter }) {
  return (
    <div className={style.container}>
      <Titre
        titre="Roles"
        searchbar={false}
        padding={{ paddingLeft: "0", paddingRight: "0" }}
        size="small"
      />
      <div className={style.rolesContainer}>
        <ul
          style={{
            "--color": "#D6DBDE",
          }}
        >
          <li
            onClick={() => setRoleFilter("tous")}
            style={
              roleFilter !== roles[0] &&
              roleFilter !== roles[1] &&
              roleFilter !== roles[2] &&
              roleFilter !== roles[3]
                ? {
                    "--color": "#f29e4f80",
                  }
                : null
            }
          >
            Tous
          </li>
          {roles.map((role, i) => (
            <React.Fragment key={i}>
              <hr style={{ opacity: "20%" }} />
              <li
                onClick={() => setRoleFilter(role)}
                style={
                  roleFilter === role
                    ? {
                        "--color": "#f29e4f80",
                      }
                    : null
                }
              >
                {role}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Roles;
