import React, { useState, useEffect } from "react";
import style from "./AppSettings.module.css";
import Button from "./Button";

import axios from "axios";

function AppSettings({ username }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [formData, setFormData] = useState({
    role_default: userData.role_default || "",
  });

  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `/api/user/${
            JSON.parse(localStorage.getItem("userData")).utilisateurID
          }/roles`
        );
        const formatedData = response.data.map((role) => role.nom_role);
        setRoles(formatedData);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchRoles();
  }, []);

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
      alert("Informations mises à jour avec succès.");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Échec de la mise à jour des informations.");
    }
  };

  return (
    <div className={style.container} id="application">
      <h2 className={style.title}>Application</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Role par défaut</label>
        <select
          name="role_default"
          id="role_default"
          value={formData.role_default}
          onChange={handleChange}
          className={style.input}
        >
          {roles.map((role, index) => (
            <option value={role} key={index}>
              {role}
            </option>
          ))}
        </select>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button content="Enregistrer" />
        </div>
      </form>
    </div>
  );
}

export default AppSettings;
