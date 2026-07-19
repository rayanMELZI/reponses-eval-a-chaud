import React, { useState, useEffect } from "react";
import style from "./InfoPersonnel.module.css";
import Button from "./Button";
import axios from "axios";

export default function InfoPersonnel({ username, structure, setStructure }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [formData, setFormData] = useState({
    nom: userData.nom || "",
    prenom: userData.prenom || "",
    fonction: userData.fonction || "",
    structureID: userData.structureID || "",
  });

  const [allStructures, setAllStructures] = useState([]);

  useEffect(() => {
    const fetchStructures = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/structure`
        );
        setAllStructures(response.data);
      } catch (error) {
        console.error("Error fetching structures:", error);
      }
    };

    fetchStructures();
  }, []);

  useEffect(() => {
    const fetchStructureName = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/structure/${structure.structureID}`
        );
        setStructure((prevStructure) => ({
          ...prevStructure,
          nom_structure: response.data.nom_structure,
        }));
      } catch (error) {
        console.error("Error fetching structure details:", error);
      }
    };
    if (structure.structureID) {
      fetchStructureName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structure.structureID, structure.nom_structure]);

  const handleStructureChange = (e) => {
    const selectedStructure = allStructures.find(
      (struct) => struct.structureID === e.target.value
    );
    setStructure((prevData) => ({
      ...prevData,
      structureID: selectedStructure ? e.target.value : "",
      nom_structure: selectedStructure ? selectedStructure.nom_structure : "",
    }));
    setFormData((prevData) => ({
      ...prevData,
      structureID: selectedStructure ? e.target.value : "",
    }));
  };

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
        `${process.env.REACT_APP_API_BASE_URL}/api/user`,
        {
          username,
          fieldsToUpdate: formData,
        }
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, ...formData })
      );

      alert("Informations mises à jour avec succès.");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Échec de la mise à jour des informations.");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Informations personnelles</h2>
      <form
        className={style.card}
        id="informations_personnel"
        onSubmit={handleSubmit}
      >
        <div className={style.row}>
          <div className={style.col}>
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              className={style.input}
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div className={style.col}>
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.row}>
          <div className={style.col}>
            <label htmlFor="fonction">Fonction</label>
            <input
              type="text"
              id="fonction"
              value={formData.fonction}
              onChange={handleChange}
            />
          </div>
          <div className={style.col}>
            <label htmlFor="structure">Structure</label>
            <select
              type="text"
              id="structure"
              onChange={handleStructureChange}
              value={structure.structureID}
              className={style.input}
            >
              {allStructures.map((struct) => (
                <option key={struct.structureID} value={struct.structureID}>
                  {struct.nom_structure}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button content="Enregistrer" type="submit" />
        </div>
      </form>
    </div>
  );
}
