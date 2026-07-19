import style from "./ParametreAV.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import ToggleProfile from "../components/ToggleProfile";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import InfoPersonnel from "../components/InfoPersonnel";
import AppSettings from "../components/AppSettings";

import { useState } from "react";

export default function ParametreAV() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [structure, setStructure] = useState({
    structureID: userData.structureID || "",
    nom_structure: "",
  });

  return (
    <div className={style.container}>
      <Sidebar />
      <div
        style={{
          maxHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Titre searchbar={false} />
        <ToggleProfile />
        <div className={style.profile} id="profile">
          <Profile structure={structure} />
          <EditProfile username={userData.username} />
        </div>
        <InfoPersonnel
          username={userData.username}
          structure={structure}
          setStructure={setStructure}
        />
        <AppSettings username={userData.username} />
        <Footer change />
      </div>
    </div>
  );
}
