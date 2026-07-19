import style from "./Notification.module.css";

const data = [
  {
    title: "Adm Microsoft",
    company: "Microsoft",
  },
  {
    title: "Adm Microsoft",
    company: "Microsoft",
  },
  {
    title: "Admrezrezrezrzrzrrezrze Microsoft",
    company: "Microsoft",
  },
  {
    title: "Adm Microsoft",
    company: "Microsoft",
  },

];

export default function Notification({ addStyle, btnColor }) {
  const length = data.length;
  const list = data.slice(0, 3);
  const date = new Date().toLocaleDateString();
  return (
    <div className={`${style.container} ${addStyle ? addStyle : ""}`}>
      <p className={style.text}>
        Vous avez <span>{length}</span> questionnaire a remplir !
      </p>
      <div className={style.card}>
        {list.map((e, i) => (
          <div key={i} className={style.details}>
            <div className={style.title}>
              <h2>{e.title}</h2>
              <h4>{e.company}</h4>
            </div>
            <p className={style.date}>Créer le {date}</p>
          </div>
        ))}
        <button className={`${style.btn} ${btnColor ? btnColor : ""}`}>
          Voir plus
        </button>
      </div>
    </div>
  );
}
