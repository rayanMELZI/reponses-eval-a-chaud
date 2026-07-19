import style from "./QuestUserInfo.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function QuestUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const { formationID, reponseID } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/reponses/${formationID}/${reponseID}`
        );
        console.log(response.data);
        setUserInfo(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch usre data:", error);
      }
    };

    fetchUserData();
  }, [formationID, reponseID]);

  // const truncateText = (text, maxLength) => {
  //   if (text.length > maxLength) {
  //     return text.slice(0, maxLength) + "...";
  //   }
  //   return text;
  // };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.col}>
          <h2>Nom :</h2>
          <span>{userInfo.nom}</span>
        </div>
        <div className={style.col}>
          <h2>Prénom :</h2>
          <span>{userInfo.prenom}</span>
        </div>
        <div className={style.col}>
          <h2>Fonction :</h2>
          <span>{userInfo.fonction}</span>
        </div>
        <div className={style.col}>
          <h2>Structure :</h2>
          <span>{userInfo.nom_structure}</span>
        </div>
      </div>
    </div>
  );
}
