import style from "./HomepageAIT.module.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Notification from "../components/Notification";
import Footer from "../components/Footer";
import HomepageBtns from "../components/HomepageBtns";

export default function HomepageP() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className={style.container}>
      <Sidebar />
      <div
        style={{
          maxHeight: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Welcome content={`Bienvenue, ${userData.prenom}!`} />
        <div className={style.notificationContainer}>
          <Notification />
          <HomepageBtns />
        </div>
        <Footer />
      </div>
    </div>
  );
}
