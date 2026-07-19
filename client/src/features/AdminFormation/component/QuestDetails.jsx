import style from "./QuestDetails.module.css";
import { useLocation } from "react-router-dom";
const data = [
  {
    title: "Administration Microsoft Exchange Server 2016/2019",
    company: "Administration Microsoft  Exchange Server 2016/2019",
    debutFormation: "2021-06-27",
    finFormation: "2021-06-27",
    debutQestionnaire: "2021-07-13",
    tempRestant: "2021-07-13",
  },
  {
    title: "Administration Microsoft Exchange Server 2016/2019",
    company: "Administration Microsoft  Exchange Server 2016/2019",
    debutFormation: "2021-06-27",
    finFormation: "2021-06-27",
    debutQestionnaire: "2021-07-13",
    tempRestant: "2021-07-13",
  },
  {
    title: "Administration Microsoft Exchange Server 2016/2019",
    company: "Administration Microsoft  Exchange Server 2016/2019",
    debutFormation: "2021-06-27",
    finFormation: "2021-06-27",
    debutQestionnaire: "2021-07-13",
    tempRestant: "2021-07-13",
  },
  {
    title: "Administration Microsoft Exchange Server 2016/2019",
    company: "Administration Microsoft  Exchange Server 2016/2019",
    debutFormation: "2021-06-27",
    finFormation: "2021-06-27",
    debutQestionnaire: "2021-07-13",
    tempRestant: "2021-07-13",
  },
  {
    title: "Administration Microsoft Exchange Server 2016/2019",
    company: "Administration Microsoft  Exchange Server 2016/2019",
    debutFormation: "2021-06-27",
    finFormation: "2021-06-27",
    debutQestionnaire: "2021-07-13",
    tempRestant: "2021-07-13",
  },
];
export default function QuestDetails({ color }) {
  const location = useLocation();
  return (
    <div className={style.container}>
      <ul className={style.info}>
        <li>Intitulé de la formation</li>
        <li>Organisme Formateur</li>
        <li>Duré du formation</li>
        <li>Début de questionnaire</li>
        <li>
          {location.pathname === "/questionnaire_cloture"
            ? "Fin du questionnaire"
            : "Temps restant"}
        </li>
      </ul>
      {data.map((e, i) => (
        <div className={style.details} style={{ "--color": color }} key={i}>
          <div className={style.item}>
            <h3>{e.title}</h3>
          </div>
          <div className={style.item}>
            <h5>{e.company}</h5>
          </div>
          <div className={`${style.item} ${style.span}`}>
            <span>du {e.debutFormation}</span>
            <span>au {e.finFormation}</span>
          </div>
          <div className={style.item}>{e.debutQestionnaire}</div>
          <div className={style.item}>{e.tempRestant}</div>
        </div>
      ))}
    </div>
  );
}
