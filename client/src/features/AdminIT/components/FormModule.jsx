import style from "./FormModule.module.css";
import Button from "./Button";

import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import axios from "axios";

export default function FormModule({
  title,
  inputs,
  mainBtn,
  mainBtnStyle,
  mainBtnOnClick,
  secondBtn,
  secondBtnStyle,
  secondBtnOnClick,
  inputIsActif,
}) {
  const navigate = useNavigate();
  const { userName } = useParams();
  const location = useLocation();

  const [usersRoles, setUsersRoles] = useState([]);

  // Initialize formData with default values from inputs (if available)
  const initialFormData = inputs.reduce((acc, row) => {
    row.forEach((field) => {
      acc[field.name] = field.value || "";
    });
    return acc;
  }, {});

  const [formData, setFormData] = useState({
    password: initialFormData.password || "",
    nom: initialFormData.nom || "",
    prenom: initialFormData.prenom || "",
    fonction: initialFormData.fonction || "",
    structureID: "1",
    email: initialFormData.email || "",
    role_default: "",
  });
  const [structures, setStructures] = useState({});
  useEffect(() => {
    const fetchStructures = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/structure`
        );
        setStructures(response.data);
      } catch (error) {
        console.error("Error fetching formations:", error);
      }
    };
    fetchStructures();
  }, []);

  const fct = inputs[1][0].options[0];
  useEffect(() => {
    if (
      !location.pathname.startsWith(
        "/AdminIT/gerer_les_membres/informations_d'un_membre/modifier_les_informations_d'un_membre"
      )
    ) {
      setFormData((prev) => {
        return { ...prev, fonction: inputs[1][0].options[0] };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fct]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStructureChange = (e) => {
    //seach for the structureID of e.target.value
    const structureID = structures.find(
      (structure) => structure.nom_structure === e.target.value
    ).structureID;
    setFormData((prevData) => ({ ...prevData, structureID }));
  };

  const handleRolesChange = (e) => {
    const { value, checked } = e.target;

    setUsersRoles((prevData) => {
      const roles = checked
        ? [...prevData, value]
        : prevData.filter((role) => role !== value);
      console.log(roles);
      return roles;
    });
    setFormData((prev) => {
      return { ...prev, role_default: usersRoles[0] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !location.pathname.startsWith(
        "/AdminIT/gerer_les_membres/informations_d'un_membre/modifier_les_informations_d'un_membre"
      )
    ) {
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/newUser`, {
          formData,
          usersRoles,
        });
        alert("Utilisateur ajouté avec succès");

        navigate(`/AdminIT`);
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Erreur lors de l'ajout de l'utilisateur");
      }
    } else {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/${userName}`,
          formData
        );
        alert("Utilisateur modifié avec succès");

        navigate(
          `/AdminIT/gerer_les_membres/informations_d'un_membre/${userName}`
        );
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Erreur lors de l'ajout de l'utilisateur");
      }
    }
  };

  return (
    <div className={style.container}>
      {title && <h2 className={style.title}>{title}</h2>}
      <form
        className={style.card}
        id="informations_personnel"
        onSubmit={handleSubmit}
      >
        {inputs.map((input, index) => (
          <div className={style.row} key={index}>
            {input.map((field) => (
              <div className={style.col} key={field.name}>
                <label htmlFor={field.label}>{field.label} :</label>
                {field.type === "select" && field.name === "fonction" ? (
                  <>
                    <input
                      list="fonction-options"
                      className={style.input}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={inputIsActif !== undefined && !inputIsActif}
                    />
                    <datalist id="fonction-options">
                      {field.options.map(
                        (option, index) =>
                          option !== "" && (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                      )}
                    </datalist>
                  </>
                ) : field.type === "select" ? (
                  <select
                    className={style.input}
                    name={field.name}
                    // value={formData[field.name]  || field.value}
                    defaultValue={field.value || field.options[0]}
                    onChange={
                      field.optionsType !== undefined &&
                      field.optionsType === "structures"
                        ? handleStructureChange
                        : handleChange
                    }
                    disabled={inputIsActif !== undefined && !inputIsActif}
                  >
                    {field.options.map(
                      (option, index) =>
                        option !== "" && (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        )
                    )}
                  </select>
                ) : field.type === "custom" ? (
                  React.cloneElement(field.component, {
                    onChange:
                      field.optionsType !== undefined &&
                      field.optionsType === "roles"
                        ? handleRolesChange
                        : null,
                  })
                ) : (
                  <input
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    type={field.type}
                    id={field.label}
                    className={style.input}
                    disabled={inputIsActif !== undefined && !inputIsActif}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "10px",
          }}
        >
          <Button
            content={mainBtn || "Enregistrer"}
            btnStyle={mainBtnStyle !== undefined && mainBtnStyle}
            onClick={mainBtnOnClick || null}
          />
          {secondBtn && (
            <Button
              content={secondBtn}
              btnStyle={secondBtnStyle !== undefined && secondBtnStyle}
              onClick={secondBtnOnClick || null}
            />
          )}
        </div>
      </form>
    </div>
  );
}
