import style from "./QuestDetails.module.css";
import { NavLink, useLocation } from "react-router-dom";
import TableRow from "./TableRow";
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
export default function QuestDetails({
  color,
  columns,
  propData,
  border,
  lineHeight,
  link,
}) {
  const location = useLocation();

  return (
    <div
      className={style.container}
      style={{
        height:
          border !== undefined
            ? "calc(90vh - (43.33px + 90.67px + 78px + 24px))"
            : null,
        maxHeight:
          border !== undefined
            ? "calc(90vh - (43.33px + 90.67px + 78px + 24px))"
            : null,
      }}
    >
      <ul className={style.info}>
        {columns === undefined ? (
          <>
            <li>Intitulé de la formation</li>
            <li>Organisme Formateur</li>
            <li>Duré du formation</li>
            <li>Début de questionnaire</li>
            <li>
              {location.pathname === "/formations_cloture"
                ? "Fin du questionnaire"
                : "Temps restant"}
            </li>
          </>
        ) : (
          <>
            <li>{columns[0]}</li>
            <li>{columns[1]}</li>
            <li>{columns[2]}</li>
            <li>{columns[3]}</li>
            <li>{columns[4]}</li>
          </>
        )}
      </ul>
      <div
        className={style.detailsContainer}
        style={{
          height: border !== undefined ? "calc(100% - 60px)" : null,
          maxHeight: border !== undefined ? "calc(100% - 60px)" : null,
        }}
      >
        {propData === undefined
          ? data.map((e, i) => (
              <NavLink
                to={link}
                style={{ textDecoration: "none", color: "#000" }}
                key={i}
              >
                <div
                  className={style.details}
                  style={{
                    "--color": color,
                    border:
                      border !== undefined && border === true
                        ? `solid ${color} 1px`
                        : null,
                    padding:
                      lineHeight !== undefined && lineHeight === "small"
                        ? "5px 10px"
                        : "20px 10px",
                  }}
                >
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
              </NavLink>
            ))
          : propData.map((e, i) => (
              <NavLink
                to={
                  link === "/AdminIT/gerer_les_membres/informations_d'un_membre"
                    ? `${link}/${e.userName}`
                    : link
                }
                style={{ textDecoration: "none", color: "#000" }}
                key={i}
              >
                <TableRow
                  nom={Object.values(e)[0]}
                  prenom={Object.values(e)[1]}
                  fonction={Object.values(e)[2]}
                  structure={Object.values(e)[3]}
                  action={Object.values(e)[4]}
                  border={border}
                  lineHeight={lineHeight}
                />
              </NavLink>
            ))}
      </div>
    </div>
  );
}
