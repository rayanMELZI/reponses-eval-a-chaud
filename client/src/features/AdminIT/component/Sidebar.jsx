import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
  const location = useLocation();
  return (
    <div className={style.sidebar}>
      <div className={style.choices}>
        <NavLink to="/">
          <img className={style.logo} src="Logo_Mask.svg" alt="LOGO" />
        </NavLink>
        {/* <NavLink to="/">
          <img className={style.utils} src="DashBoardA.svg" alt="UTILS" />
        </NavLink> */}
        <NavLink to="/">
          <img
            className={
              location.pathname === "/"
                ? style.utils
                : `${style.utils} ${style.active}`
            }
            src="DashBoardA.svg"
            alt="UTILS"
          />
        </NavLink>
        <NavLink to="/questionnaire_en_attente">
          <img
            className={
              location.pathname === "/questionnaire_en_attente"
                ? style.utils
                : `${style.utils} ${style.active}`
            }
            src="quill_paperA.svg"
            alt="UTILS"
          />
        </NavLink>
        <NavLink to="/questionnaire_non_cloture">
          <img
            className={
              location.pathname === "/questionnaire_non_cloture"
                ? style.utils
                : `${style.utils} ${style.active}`
            }
            src="bx_editA.svg"
            alt="UTILS"
          />
        </NavLink>
        <NavLink to="/questionnaire_cloture">
          <img
            className={
              location.pathname === "/questionnaire_cloture"
                ? style.utils
                : `${style.utils} ${style.active}`
            }
            src="iconamoon_file-closeA.svg"
            alt="UTILS"
          />
        </NavLink>
        <NavLink to="/parametre">
          <img
            className={
              location.pathname === "/parametre"
                ? style.utils
                : `${style.utils} ${style.active}`
            }
            src="clarity_settings-line.svg"
            alt="UTILS"
          />
        </NavLink>
      </div>

      <div className={style.out}>
        {/* <NavLink> */}
        <img src="sign-out.svg" alt="OUT" />
        {/* </NavLink> */}
      </div>
    </div>
  );
}
