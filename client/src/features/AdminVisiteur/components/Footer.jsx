import style from "./Footer.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Footer({ change }) {
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/admin-email`)
      .then((response) => {
        setAdminEmail(response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching admin email:", error);
      });
  }, []);

  const handleClick = () => {
    window.location.href = `mailto:${adminEmail}`;
  };

  return (
    <div className={`${style.container} ${change ? style.change : ""}`}>
      <span>
        FormEval • Plateforme d'évaluation des formations
      </span>
      <button className={style.button} onClick={handleClick}>
        Contact
      </button>
    </div>
  );
}
