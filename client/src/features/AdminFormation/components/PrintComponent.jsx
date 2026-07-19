import React from "react";
import style from "./PrintComponent.module.css";

import BienvenueText from "../components/BienvenueText";
import QuestionnaireInfo from "../components/QuestionnaireInfo";
import QuestUserInfo from "../components/QuestUserInfo";
import Satisfaction from "../components/Satisfaction";
import TableDevaluation from "../components/TableDevaluation";
import TauxDeSatisfaction from "../components/TauxDeSatisfaction";

const PrintComponent = React.forwardRef((props, ref) => (
  <div ref={ref} className={style.printContainer}>
    {props.items === undefined ? (
      <table id="print-component" className={style.printComponent}>
        <thead>
          <tr>
            <th>
              <hr />
              <header className={style.printHeader}>
                <img
                  src="/logo.svg"
                  alt="Logo FormEval"
                  className={style.logo}
                />
                <h4 className={style.printTitle}>{props.title}</h4>
              </header>
              <hr />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <main className={style.printContent}>
                <BienvenueText />
                <QuestUserInfo repID={props.repID} />
                <QuestionnaireInfo />
                <TauxDeSatisfaction taux={props.taux} />
                <Satisfaction />
                <TableDevaluation isCloture={true} repID={props.repID} />
                <TauxDeSatisfaction taux={props.taux} bottom={true} />
              </main>
            </td>
          </tr>
        </tbody>
        <tfoot className="table-footer">
          <tr>
            <td>
              <footer className={style.printFooter}>
                <p>FormEval ● Évaluation des formations</p>
              </footer>
            </td>
          </tr>
        </tfoot>
      </table>
    ) : (
      <table id="print-component" className={style.printComponent}>
        <thead>
          <tr>
            <th>
              <hr />
              <header className={style.printHeader}>
                <img
                  src="/logo.svg"
                  alt="Logo FormEval"
                  className={style.logo}
                />
                <h4 className={style.printTitle}>
                  Réponse au questionnaire d'évaluation
                </h4>
              </header>
              <hr />
            </th>
          </tr>
        </thead>
        {props.items.map((item, index) => (
          <React.Fragment key={index}>
            <tbody>
              <tr>
                <td>
                  <main className={style.printContent}>
                    <BienvenueText />
                    <QuestUserInfo repID={item.repID} />
                    <QuestionnaireInfo />
                    <TauxDeSatisfaction taux={item.taux} />
                    <Satisfaction />
                    <TableDevaluation isCloture={true} repID={item.repID} />
                    <TauxDeSatisfaction taux={item.taux} bottom={true} />
                  </main>
                </td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
        <tfoot className="table-footer">
          <tr>
            <td>
              <footer className={style.printFooter}>
                <p>FormEval ● Évaluation des formations</p>
              </footer>
            </td>
          </tr>
        </tfoot>
      </table>
    )}
  </div>
));

export default PrintComponent;
