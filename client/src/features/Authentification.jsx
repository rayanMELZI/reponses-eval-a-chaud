import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Welcome from "./participant/component/Welcome";
import Button from "./participant/component/Button";
import Footer from "./participant/component/Footer";

import style from "./Authentification.module.css";

function Authentification() {
  const [values, setValues] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("fullUsersData");
    localStorage.removeItem("allUsersData");
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/login`,
        values
      );
      const role = response.data.user.role_default;
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      // Fetch user with its structure
      const userResponse = await axios.get(
        `/api/users/details/${response.data.user.username}`
      );

      // Store the full user data with structure in local storage
      localStorage.setItem(
        "fullUsersData",
        JSON.stringify(userResponse.data[0])
      );

      // Fetch all users with their structures
      const usersResponse = await axios.get(
        `/api/users/details`
      );

      // Store the full user data with structures in local storage
      localStorage.setItem("allUsersData", JSON.stringify(usersResponse.data));

      switch (role) {
        case "Admin Formation":
          navigate("/AdminFormation");
          break;

        case "Admin IT":
          navigate("/AdminIT");
          break;

        case "Admin Visiteur":
          navigate("/AdminVisiteur");
          break;

        default:
          navigate("/Participant");
          break;
      }
    } catch (error) {
      alert(`Nom d'utilisateur ou mot de passe invalide`);
    }
  };

  return (
    <div className={style.container}>
      <Welcome
        content="Connexion a la platform des Réponses aux questionnaire d'évaluation des formation à chaud"
        change
      />

      <form action="" className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="" className={style.label}>
          Nom d'utilisateur :
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className={style.input}
          onChange={handleChange}
          value={values.username}
        />
        <label htmlFor="" className={style.label}>
          Mot de passe :
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={style.input}
          onChange={handleChange}
          value={values.password}
        />

        <div className={style.btn}>
          <Button content="se connecter" />
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Authentification;
