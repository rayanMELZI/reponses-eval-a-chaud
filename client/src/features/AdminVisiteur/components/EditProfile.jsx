import style from "./EditProfile.module.css";
import Button from "./Button";
import { useState } from "react";

import axios from "axios";

export default function EditProfile({ username }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    email: userData.email || "",
    password: userData.password || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/user`,
        {
          username: username,
          fieldsToUpdate: formData,
        }
      );
      localStorage.setItem("userData", JSON.stringify(formData));
      alert("Informations mises à jour avec succès");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Échec de la mise à jour des informations");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Modifier le profil</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className={style.input}
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          className={style.input}
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "15px",
          }}
        >
          <Button content="Enregistrer" />
        </div>
      </form>
    </div>
  );
}
