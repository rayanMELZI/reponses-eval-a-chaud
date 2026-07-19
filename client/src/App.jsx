import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Authentification from "./features/Authentification";
import HomepageP from "./features/participant/pages/HomepageP";
import QuestEnAttente from "./features/participant/pages/QuestEnAttente";
import QuestNonClot from "./features/participant/pages/QuestNonClot";
import QuestClot from "./features/participant/pages/QuestClot";
import Questionnaire from "./features/participant/pages/Questionnaire";
import ParametreP from "./features/participant/pages/Parametre";

import HomepageAF from "./features/AdminFormation/pages/HomepageAF";
import FormationNonCloture from "./features/AdminFormation/pages/FormationNonCloture";
import ReponsesFormation from "./features/AdminFormation/pages/ReponsesFormation";
import ModifierFormation from "./features/AdminFormation/pages/ModifierFormation";
import DetailsReponse from "./features/AdminFormation/pages/DetailsReponse";
import AjouterFormation from "./features/AdminFormation/pages/AjouterFormation";
import FormationCloture from "./features/AdminFormation/pages/FormationCloture";
import ParametreAF from "./features/AdminFormation/pages/Parametre";

import HomepageAIT from "./features/AdminIT/pages/HomepageAIT";
import GererMembres from "./features/AdminIT/pages/GererMembres";
import InfoMembre from "./features/AdminIT/pages/InfoMembre";
import EditInfoMembre from "./features/AdminIT/pages/EditInfoMembre";
import AjouterMembre from "./features/AdminIT/pages/AjouterMembre";
import GererRoles from "./features/AdminIT/pages/GererRoles";
import ParametreAIT from "./features/AdminIT/pages/Parametre";

import HomepageAV from "./features/AdminVisiteur/pages/HomepageAV";
import FormationNonClotureAV from "./features/AdminVisiteur/pages/FormationNonClotureAV";
import FormationClotureAV from "./features/AdminVisiteur/pages/FormationClotureAV";
import ParametreAV from "./features/AdminVisiteur/pages/ParametreAV";
import ReponsesFormationAV from "./features/AdminVisiteur/pages/ReponsesFormationAV";
import DetailsReponseAV from "./features/AdminVisiteur/pages/DetailsReponseAV";

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const [forbidden, setForbidden] = useState(false);
  const fullUsersData = JSON.parse(localStorage.getItem("fullUsersData")) || {
    roles: [],
  };
  const location = useLocation();

  const hasAccess = roles.some((role) => fullUsersData.roles.includes(role));

  useEffect(() => {
    if (!hasAccess) {
      setForbidden(true);
    } else {
      setForbidden(false);
    }
  }, [hasAccess]);

  return (
    <>
      {forbidden && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="lock"></div>
          <div className="message">
            <h1
              style={{
                margin: "40px 0 20px",
              }}
            >
              Accès refusé
            </h1>
            <p>Vous n'avez pas le rôle nécessaire pour voir cette page.</p>
          </div>
        </div>
      )}
      {!forbidden && <Component />}
    </>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Authentification />} />
      <Route
        path="/Participant"
        element={<PrivateRoute roles={["Participant"]} element={HomepageP} />}
      />
      <Route
        path="/Participant/questionnaire_en_attente"
        element={
          <PrivateRoute roles={["Participant"]} element={QuestEnAttente} />
        }
      />
      <Route
        path="/Participant/questionnaire_non_cloture"
        element={
          <PrivateRoute roles={["Participant"]} element={QuestNonClot} />
        }
      />
      <Route
        path="/Participant/questionnaire_cloture"
        element={<PrivateRoute roles={["Participant"]} element={QuestClot} />}
      />
      <Route
        path="/Participant/questionnaires/:formationID"
        element={
          <PrivateRoute roles={["Participant"]} element={Questionnaire} />
        }
      />
      <Route
        path="/Participant/parametre"
        element={<PrivateRoute roles={["Participant"]} element={ParametreP} />}
      />
      <Route
        path="/AdminFormation"
        element={
          <PrivateRoute roles={["Admin Formation"]} element={HomepageAF} />
        }
      />
      <Route
        path="/AdminFormation/formations_non_cloture"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={FormationNonCloture}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_non_cloture/reponses_formation/:formationID"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={ReponsesFormation}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_non_cloture/reponses_formation/modifier_formation/:formationID"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={ModifierFormation}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_non_cloture/reponses_formation/:formationID/details_reponse/:reponseID"
        element={
          <PrivateRoute roles={["Admin Formation"]} element={DetailsReponse} />
        }
      />
      <Route
        path="/AdminFormation/ajouter_une_formation"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={AjouterFormation}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_cloture"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={FormationCloture}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_cloture/reponses_formation/:formationID"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={ReponsesFormation}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_cloture/reponses_formation/modifier_formation/:formationID"
        element={
          <PrivateRoute
            roles={["Admin Formation"]}
            element={ModifierFormation}
          />
        }
      />
      <Route
        path="/AdminVisiteur/formations_non_cloture/reponses_formation/:formationID"
        element={
          <PrivateRoute
            roles={["Admin Visiteur"]}
            element={ReponsesFormationAV}
          />
        }
      />
      <Route
        path="/AdminVisiteur/formations_cloture/reponses_formation/:formationID"
        element={
          <PrivateRoute
            roles={["Admin Visiteur"]}
            element={ReponsesFormationAV}
          />
        }
      />
      <Route
        path="/AdminFormation/formations_cloture/reponses_formation/:formationID/details_reponse/:reponseID"
        element={
          <PrivateRoute roles={["Admin Formation"]} element={DetailsReponse} />
        }
      />
      <Route
        path="/AdminVisiteur/formations_cloture/reponses_formation/:formationID/details_reponse/:reponseID"
        element={
          <PrivateRoute roles={["Admin Visiteur"]} element={DetailsReponseAV} />
        }
      />
      <Route
        path="/AdminVisiteur/formations_non_cloture/reponses_formation/:formationID/details_reponse/:reponseID"
        element={
          <PrivateRoute roles={["Admin Visiteur"]} element={DetailsReponseAV} />
        }
      />
      <Route
        path="/AdminFormation/parametre"
        element={
          <PrivateRoute roles={["Admin Formation"]} element={ParametreAF} />
        }
      />
      <Route
        path="/AdminVisiteur"
        element={
          <PrivateRoute roles={["Admin Visiteur"]} element={HomepageAV} />
        }
      />
      <Route
        path="/AdminVisiteur/formations_non_cloture"
        element={
          <PrivateRoute
            roles={["Admin Visiteur"]}
            element={FormationNonClotureAV}
          />
        }
      />
      <Route
        path="/AdminVisiteur/formations_cloture"
        element={
          <PrivateRoute
            roles={["Admin Visiteur"]}
            element={FormationClotureAV}
          />
        }
      />
      <Route
        path="/AdminVisiteur/parametre"
        element={
          <PrivateRoute roles={["Admin Visiteur"]} element={ParametreAV} />
        }
      />
      <Route
        path="/AdminIT"
        element={<PrivateRoute roles={["Admin IT"]} element={HomepageAIT} />}
      />
      <Route
        path="/AdminIT/gerer_les_membres"
        element={<PrivateRoute roles={["Admin IT"]} element={GererMembres} />}
      />
      <Route
        path="/AdminIT/gerer_les_membres/informations_d'un_membre/:userName"
        element={<PrivateRoute roles={["Admin IT"]} element={InfoMembre} />}
      />
      <Route
        path="/AdminIT/gerer_les_membres/informations_d'un_membre/modifier_les_informations_d'un_membre/:userName"
        element={<PrivateRoute roles={["Admin IT"]} element={EditInfoMembre} />}
      />
      <Route
        path="/AdminIT/ajouter_un_membre"
        element={<PrivateRoute roles={["Admin IT"]} element={AjouterMembre} />}
      />
      <Route
        path="/AdminIT/gerer_les_roles"
        element={<PrivateRoute roles={["Admin IT"]} element={GererRoles} />}
      />
      <Route
        path="/AdminIT/parametre"
        element={<PrivateRoute roles={["Admin IT"]} element={ParametreAIT} />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
