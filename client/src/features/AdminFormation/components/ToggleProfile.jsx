import style from "./ToggleProfile.module.css";
import { useState } from "react";

export default function ToggleProfile() {
  const [active, setActive] = useState("Profile");
  return (
    <div className={style.container}>
      <a href="#profile" className={style.a}>
        <h3
          className={active === "Profile" ? style.active : null}
          onClick={() => setActive("Profile")}
        >
          Profile
        </h3>
      </a>
      <a href="#application" className={style.a}>
        <h3
          className={active === "Application" ? style.active : null}
          onClick={() => setActive("Application")}
        >
          Application
        </h3>
      </a>
    </div>
  );
}
