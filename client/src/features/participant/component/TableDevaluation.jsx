import React, { useEffect, useState } from "react";
import style from "./TableDevaluation.module.css";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function TableDevaluation({ isCloture }) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [section3Visible, setSection3Visible] = useState(false);
  const { formationID } = useParams();

  const [formText, setFormText] = useState({
    pointsForts: "",
    pointsAmeliorer: "",
    partiesInteressantes: "",
    recommandations: "",
    commentaires: "",
  });

  const handleOptionChange = (sectionIndex, rowIndex, colIndex) => {
    if (isCloture) return;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [`${sectionIndex}-${rowIndex}`]: colIndex,
    }));
  };

  const handleSection3VisibilityChange = (event) => {
    if (isCloture) return;

    const isVisible = event.target.value === "yes";
    setSection3Visible(isVisible);

    if (!isVisible) {
      setSelectedOptions((prevState) => {
        const newState = { ...prevState };
        for (let key in newState) {
          if (key.startsWith("2-")) {
            delete newState[key];
          }
        }
        return newState;
      });
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormText((prevText) => ({
      ...prevText,
      [name]: value,
    }));
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userID = userData.utilisateurID;
  const renderCell = (sectionIndex, rowIndex, colIndex, emoji, altText) => (
    <td
      key={`${sectionIndex}-${rowIndex}-${colIndex}`}
      className={style.emojis}
      onClick={() => handleOptionChange(sectionIndex, rowIndex, colIndex)}
    >
      {selectedOptions[`${sectionIndex}-${rowIndex}`] === colIndex ? (
        <img src="/mdi_check-bold.svg" alt="Checkmark" />
      ) : (
        <img src={emoji} alt={altText} />
      )}
    </td>
  );

  const calculateSatisfactionRate = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    Object.values(selectedOptions).forEach((value) => {
      counts[value] += 1;
    });
    const N =
      counts[1] * 0.25 + counts[2] * 0.5 + counts[3] * 0.75 + counts[4] * 1;
    const divisor = section3Visible ? 22 : 17;
    const satisfactionRate = (N / divisor) * 100;
    return satisfactionRate.toFixed(2);
  };
  const handleSave = async () => {
    if (!validateSelections()) {
      alert("Veuillez sélectionner une option dans chaque ligne.");
      return;
    }

    // Validate text areas
    const { pointsForts, pointsAmeliorer, partiesInteressantes } = formText;
    if (!pointsForts || !pointsAmeliorer || !partiesInteressantes) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const satisfactionRate = calculateSatisfactionRate();
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/Responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formationID,
            userID,
            selectedOptions,
            satisfactionRate,
            ...formText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save responses");
      }

      alert("Réponses enregistrées avec succès.");
      setSelectedOptions({});
      setFormText({
        pointsForts: "",
        pointsAmeliorer: "",
        partiesInteressantes: "",
        recommandations: "",
        commentaires: "",
      });

      navigate("/Participant/questionnaire_non_cloture");
    } catch (error) {
      alert(
        "Erreur lors de l'enregistrement des réponses. Veuillez réessayer."
      );
    }
  };

  const validateSelections = () => {
    for (
      let sectionIndex = 0;
      sectionIndex < tableData.length;
      sectionIndex++
    ) {
      if (sectionIndex === 2 && !section3Visible) continue;
      for (
        let rowIndex = 0;
        rowIndex < tableData[sectionIndex].rows.length;
        rowIndex++
      ) {
        if (!selectedOptions.hasOwnProperty(`${sectionIndex}-${rowIndex}`)) {
          return false;
        }
      }
    }
    return true;
  };
  const fetchSavedData = async (formationID, userID) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/evaluation/${formationID}/${userID}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return {
        selectedOptions: {
          "0-0": parseInt(data.question1),
          "0-1": parseInt(data.question2),
          "0-2": parseInt(data.question3),
          "0-3": parseInt(data.question4),
          "0-4": parseInt(data.question5),
          "0-5": parseInt(data.question6),
          "1-0": parseInt(data.question7),
          "1-1": parseInt(data.question8),
          "1-2": parseInt(data.question9),
          "1-3": parseInt(data.question10),
          "1-4": parseInt(data.question11),
          "2-0": parseInt(data.question12),
          "2-1": parseInt(data.question13),
          "2-2": parseInt(data.question14),
          "2-3": parseInt(data.question15),
          "2-4": parseInt(data.question16),
          "3-0": parseInt(data.question17),
          "3-1": parseInt(data.question18),
          "4-0": parseInt(data.question19),
          "4-1": parseInt(data.question20),
          "4-2": parseInt(data.question21),
          "4-3": parseInt(data.question22),
        },
        formText: {
          pointsForts: data.points_forts,
          pointsAmeliorer: data.points_ameliorer,
          partiesInteressantes: data.parties_interessantes,
          recommandations: data.recommandations,
          commentaires: data.commentaires,
        },
        // section3Visible: true,
      };
    } catch (error) {
      console.error("Failed to fetch saved data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const savedData = await fetchSavedData(formationID, userID);
      if (savedData) {
        setSelectedOptions(savedData.selectedOptions || {});
        setFormText(savedData.formText || {});
        setSection3Visible(savedData.section3Visible !== false);
      }
    };
    fetchData();
  }, [formationID, userID]);

  const tableData = [
    {
      section: "1. Contenu et démarche pédagogique",
      rows: [
        "Contenu adapté à votre niveau",
        "Respect du programme annoncé",
        "Utilité par rapport à vos besoins métier",
        "Dosage entre théorie et pratique",
        "Exercices et mises en situation",
        "Qualité des supports fournis",
      ],
    },
    {
      section: "2. L'intervenant",
      rows: [
        "Maîtrise du sujet",
        "Gestion du temps et du rythme",
        "Pertinence des méthodes d'animation",
        "Écoute et qualité des réponses apportées",
        "Capacité à impliquer le groupe",
      ],
    },
    {
      section: "3. Organisation et cadre",
      rows: [
        "Qualité de l'accueil",
        "Organisation générale",
        "Salle et équipements",
        "Conditions d'hébergement",
        "Qualité de la restauration",
      ],
    },
    {
      section: "4. Dynamique de groupe",
      rows: [
        "Homogénéité des participants",
        "Qualité des échanges au sein du groupe",
      ],
    },
    {
      section: "5. Bilan global",
      rows: [
        "Information reçue avant la session",
        "Atteinte des objectifs annoncés",
        "Durée de la session",
        "Possibilité d'appliquer les acquis au travail",
      ],
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table>
          <thead>
            <tr className={style.tableHead}>
              <th>CRITÈRES D'ÉVALUATION</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <tr key={`section-${sectionIndex}`}>
                  <td colSpan={1} className={style.color}>
                    {section.section}
                  </td>
                </tr>
                {sectionIndex === 2 && (
                  <tr key={`section3-options`}>
                    <td className={style.concernedText} colSpan={1}>
                      Concerné
                    </td>
                    <td colSpan={2}>
                      <input
                        type="radio"
                        name="section3"
                        value="yes"
                        checked={section3Visible === true}
                        onChange={handleSection3VisibilityChange}
                      />
                      Yes
                    </td>
                    <td colSpan={2}>
                      <input
                        type="radio"
                        name="section3"
                        value="no"
                        checked={section3Visible === false}
                        onChange={handleSection3VisibilityChange}
                      />
                      No
                    </td>
                  </tr>
                )}
                {(sectionIndex !== 2 || section3Visible) &&
                  section.rows.map((row, rowIndex) => (
                    <tr key={`${sectionIndex}-${rowIndex}`}>
                      <td>{row}</td>
                      {renderCell(
                        sectionIndex,
                        rowIndex,
                        1,
                        "/Insatisfait.svg",
                        "Insatisfait"
                      )}
                      {renderCell(
                        sectionIndex,
                        rowIndex,
                        2,
                        "/Peu_satisfait.svg",
                        "Peu satisfait"
                      )}
                      {renderCell(
                        sectionIndex,
                        rowIndex,
                        3,
                        "/Satisfait.svg",
                        "Satisfait"
                      )}
                      {renderCell(
                        sectionIndex,
                        rowIndex,
                        4,
                        "/TresSatisfait.svg",
                        "Très satisfait"
                      )}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.textField}>
        <label htmlFor="pointsForts">Points forts de la session *</label>
        <textarea
          name="pointsForts"
          id="pointsForts"
          value={formText.pointsForts}
          onChange={handleTextChange}
          required
          rows={5}
          disabled={isCloture}
        />
        <label htmlFor="pointsAmeliorer">Axes d'amélioration *</label>
        <textarea
          name="pointsAmeliorer"
          id="pointsAmeliorer"
          value={formText.pointsAmeliorer}
          onChange={handleTextChange}
          required
          rows={5}
          disabled={isCloture}
        />
        <label htmlFor="partiesInteressantes">
          Quelles parties du programme avez-vous trouvées les plus utiles ? *
        </label>
        <textarea
          name="partiesInteressantes"
          id="partiesInteressantes"
          value={formText.partiesInteressantes}
          onChange={handleTextChange}
          required
          rows={5}
          disabled={isCloture}
        />
        <label htmlFor="recommandations">
          Suggestions et recommandations :
        </label>
        <textarea
          name="recommandations"
          id="recommandations"
          value={formText.recommandations || ""}
          onChange={handleTextChange}
          rows={5}
          disabled={isCloture}
        />
        <label htmlFor="commentaires">Commentaires/Divers :</label>
        <textarea
          name="commentaires"
          id="commentaires"
          value={formText.commentaires || ""}
          onChange={handleTextChange}
          rows={5}
          disabled={isCloture}
        />
      </div>
      {!isCloture && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 0",
          }}
        >
          <button className={style.saveButton} onClick={handleSave}>
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}
