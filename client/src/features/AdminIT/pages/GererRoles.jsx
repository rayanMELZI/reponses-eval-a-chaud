import style from "./GererRoles.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import Roles from "../components/Roles";
import Membres from "../components/Membres";
import { useState } from "react";

export default function GererRoles() {
  const [roleFilter, setRoleFilter] = useState("tous");
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
        <Titre searchbar={false} padding={{ paddingBottom: "6px" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 70px",
          }}
        >
          <Roles roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
          <Membres roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
