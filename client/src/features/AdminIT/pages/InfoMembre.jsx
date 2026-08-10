import style from "./InfoMembre.module.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Titre from "../components/Titre";
import Footer from "../components/Footer";
import FormModule from "../components/FormModule";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InfoMembre() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `/api/user/${userName}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userName]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

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
        <Titre titre="Informations d'un Membre" searchbar={false} />

        <FormModule
          inputs={[
            [
              {
                name: "nom",
                label: "Nom",
                type: "text",
                value: userDetails.nom,
              },
              {
                name: "prenom",
                label: "Prénom",
                type: "text",
                value: userDetails.prenom,
              },
            ],
            [
              {
                name: "fonction",
                label: "Fonction",
                type: "select",
                options: [userDetails.fonction],
                value: userDetails.fonction,
              },
              {
                name: "nom_structure",
                label: "Structure",
                type: "select",
                options: [userDetails.nom_structure],
                value: userDetails.nom_structure,
              },
            ],
            [
              {
                name: "email",
                label: "Email",
                type: "email",
                value: userDetails.email,
              },
            ],
            [
              {
                name: "password",
                label: "Mot de passe",
                type: "text",
                value: userDetails.password,
              },
            ],
          ]}
          mainBtn="Modifier"
          mainBtnStyle="white"
          mainBtnOnClick={(event) => {
            event.preventDefault();
            navigate(
              `/AdminIT/gerer_les_membres/informations_d'un_membre/modifier_les_informations_d'un_membre/${userName}`
            );
          }}
          inputIsActif={false}
        />

        <Footer />
      </div>
    </div>
  );
}
