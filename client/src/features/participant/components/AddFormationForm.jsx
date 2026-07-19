import React from "react";
import style from "./AddFormationForm.module.css";
import TextInput from "../components/TextInput.jsx";

import axios from "axios";

function AddFormationForm({ formation, setFormation, isDisabled }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value,
    }));
  };

  return (
    <div className={style.container}>
      <div>
        <TextInput
          label="Intitulé de la formation :"
          name="intitule"
          value={formation.intitule}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
        <TextInput
          label="Organisme Formateur :"
          name="org_formateur"
          value={formation.org_formateur}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
        <TextInput
          label="Période de formation : "
          isPeriode={true}
          isPrdLabel="Du :"
          name="date_debut"
          value={formation.date_debut}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
        <TextInput
          label="Période du questionnaire :"
          isPeriode={true}
          isPrdLabel="Du :"
          name="date_debut_questionnaire"
          value={formation.date_debut_questionnaire}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
      </div>
      <div>
        <TextInput
          label="Nom du formateur :"
          name="nom_formateur"
          value={formation.nom_formateur}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
        <TextInput
          label="Lieu :"
          name="lieu"
          value={formation.lieu}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
        <TextInput
          label="&#8203;"
          isPeriode={true}
          isPrdLabel="au :"
          name="date_fin"
          value={formation.date_fin}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
        <TextInput
          label="&#8203;"
          isPeriode={true}
          isPrdLabel="au :"
          name="date_fin_questionnaire"
          value={formation.date_fin_questionnaire}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}

export default AddFormationForm;
