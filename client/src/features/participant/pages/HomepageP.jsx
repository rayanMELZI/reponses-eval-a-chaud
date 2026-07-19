import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import style from "./HomepageP.module.css";
import Welcome from "../component/Welcome";
import Notification from "../component/Notification";
import Footer from "../component/Footer";

export default function HomepageP() {
  const userData = JSON.parse(localStorage.getItem("userData"));


  return (
    <div className={style.container}>
      <Header />
      <Sidebar />
      <Welcome content={`Bienvenue, ${userData.prenom}!`} />
      <div className={style.notificationContainer}>
        <Notification color="#dc354680" />
        <Notification addStyle={style.secondNotification} color="#302CD780" />
      </div>
      <Footer />
    </div>
  );
}
