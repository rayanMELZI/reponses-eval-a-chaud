import React from "react";
import style from "./AddFormationForm.module.css";
import TextInput from "../components/TextInput.jsx";

function AddFormationForm() {
  return (
    <div className={style.container}>
      <div>
        <TextInput label="Intitulé de la formation :" />
        <TextInput label="Organisme Formateur : " />
        <TextInput
          label="Période de formation : "
          isPeriode={true}
          isPrdLabel="Du :"
        />
        <TextInput
          label="Période du questionnaire :"
          isPeriode={true}
          isPrdLabel="Du :"
        />
      </div>
      <div>
        <TextInput label="Nom du formateur : " />
        <TextInput label="Lieu : " />
        <TextInput label="&#8203;" isPeriode={true} isPrdLabel="au :" />
        <TextInput label="&#8203;" isPeriode={true} isPrdLabel="au :" />
      </div>
    </div>
  );
}

export default AddFormationForm;
