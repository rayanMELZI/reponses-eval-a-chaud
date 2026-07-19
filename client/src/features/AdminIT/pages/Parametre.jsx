import style from "./Parametre.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import ToggleProfile from "../components/ToggleProfile";
import ParametreModule from "../components/ParametreModule";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Parametre() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState(userData);
  const [ldap, setLdap] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/${userData.username}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching the user information", error);
      }
    };

    const fetchLDAPdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/parametres`
        );
        // console.log(response.data);
        setLdap(response.data);
      } catch (error) {
        console.error("Error fetching the LDAP Server information", error);
      }
    };

    fetchUserInfo();
    fetchLDAPdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log(ldap);
  // }, [ldap]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      password: event.target["Mot de passe"].value,
      nom: userData.nom,
      prenom: userData.prenom,
      email: event.target["Email"].value,
      fonction: userData.fonction,
      structureID: userData.structureID,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/${user.username}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Paramètres de profil mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating LDAP settings", error);
      alert("Échec de la mise à jour des paramètres de profil.");
    }
  };

  const handleLDAPSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      ServeurLDAP: event.target["Serveur LDAP"].value,
      LDAP_port: event.target["Port LDAP"].value,
      baseDN: event.target["Base DN"].value,
      DN_cmpt:
        "cn=" +
        event.target["Nom de l'utilisateur LDAP"].value +
        "," +
        event.target["Base DN"].value,
      LDAP_username: event.target["Nom de l'utilisateur LDAP"].value,
      LDAP_password: event.target["Mot de passe LDAP"].value,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/parametres`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Paramètres LDAP mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating LDAP settings", error);
      alert("Échec de la mise à jour des paramètres LDAP.");
    }
  };

  const handleMessagerieSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      Serveur_msgr: event.target["Serveur de messagerie"].value,
      Port_msgr: event.target["Port de messagerie"].value,
      email_admin: event.target["Courriel de l'administrateur"].value,
      nom_Admin: event.target["Nom de l'administrateur"].value,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/parametres`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Paramètres de messagerie mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating messagerie settings", error);
      alert("Échec de la mise à jour des paramètres de messagerie.");
    }
  };

  const sendTestingEmail = async (event) => {
    event.preventDefault();

    const to = ldap.email_admin;
    const subject = `Test de messagerie`;
    const message = `Cet email est envoyé pour vérifier le bon fonctionnement du système de messagerie.`;
    const body = { to, subject, message };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/send-notification`,
        body
      );
      alert("Email envoyé avec succès !");
    } catch (error) {
      console.error("Error sending email", error);
      alert("Échec de l'envoi de l'email.");
    }
  };

  const handleSynchronisationSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/update-sync-interval`,
        JSON.stringify({
          syncIntervalDays: parseInt(
            event.target["Période de synchronisation automatique (en jours)"]
              .value,
            10
          ),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Paramètres de synchronisation mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating synchronisation settings", error);
      alert("Échec de la mise à jour des paramètres de synchronisation.");
    }
  };

  const onSynchronisationMainBtnClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/sync-ldap`
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error syncing LDAP:", error);
      alert("Erreur lors de la synchronisation des données LDAP.");
    }
  };

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
        <ParametreModule
          toggleId="Profil"
          title="Profil"
          inputName1="Email"
          value1={user.email}
          inputName2="Mot de passe"
          value2={user.password}
          onSubmit={handleProfileSubmit}
        />
        <ParametreModule
          toggleId="AuthLDAP"
          title="Authentification LDAP"
          inputName1="Serveur LDAP"
          value1={ldap.ServeurLDAP}
          inputName2="Port LDAP"
          value2={ldap.LDAP_port}
          inputName3="Base DN"
          value3={ldap.baseDN}
          inputName4="DN du compte"
          value4={ldap.DN_cmpt}
          disabled4={true}
          inputName5="Nom de l'utilisateur LDAP"
          value5={ldap.LDAP_username}
          inputName6="Mot de passe LDAP"
          value6={ldap.LDAP_password}
          onSubmit={handleLDAPSubmit}
        />
        <ParametreModule
          toggleId="Messagerie"
          title="Messagerie"
          inputName1="Serveur de messagerie"
          value1={ldap.Serveur_msgr}
          inputName2="Port de messagerie"
          value2={ldap.Port_msgr}
          inputName3="Courriel de l'administrateur"
          value3={ldap.email_admin}
          inputName4="Nom de l'administrateur"
          value4={ldap.nom_Admin}
          secondBtn="Envoyer un couriel de test a l'administrateur"
          secondBtnStyle="white"
          onSecondBtnClick={sendTestingEmail}
          onSubmit={handleMessagerieSubmit}
        />
        <ParametreModule
          toggleId="Synchronisation"
          title="Synchronisation"
          inputName1="Période de synchronisation automatique (en jours)"
          value1={ldap.periode_synch}
          mainBtn="Synchroniser Manuellement"
          onMainBtnClick={onSynchronisationMainBtnClick}
          secondBtn="Enregistrer"
          onSubmit={handleSynchronisationSubmit}
        />
        <Footer change />
      </div>
    </div>
  );
}
