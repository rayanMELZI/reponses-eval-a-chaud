import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import axios from "axios";

export default function Profile() {
  let userData = JSON.parse(localStorage.getItem("userData"));

  const [struct, setStruct] = useState("");

  useEffect(() => {
    const fetchStructureName = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/structure/${userData.structureID}`
        );
        setStruct(response.data.nom_structure);
        // console.log(userData.structureID);
      } catch (error) {
        console.error("Error fetching structure details:", error);
      }
    };
    if (userData.structureID) {
      fetchStructureName();
    }
  }, [userData.structureID]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Profile du participant</h2>
      <div className={style.profile}>
        <div className={style.info}>
          <img src="/Mask_group.svg" alt="profile" />
          <h3>
            {userData.prenom} {userData.nom}
          </h3>
        </div>
        <div className={style.details}>
          <div className={style.infoDetails}>
            <h4>Fonction :</h4>
            <span>{userData.fonction}</span>
          </div>
          <div className={style.infoDetails}>
            <h4>Structure :</h4>
            <span>{struct}</span>
          </div>
          <div className={style.infoDetails}>
            <h4>Email :</h4>
            <span>{userData.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
