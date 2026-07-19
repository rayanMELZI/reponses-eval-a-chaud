import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import style from "./HomepageP.module.css";
import Welcome from "../component/Welcome";
import Notification from "../component/Notification";
import Footer from "../component/Footer";
import Graph from "../component/Graph";
export default function HomepageP() {
  return (
    <div className={style.container}>
      <Sidebar />
      <div
        style={{
          maxHeight: "100vh",
          overflowY: "hidden",
        }}
      >
        <Header />
        <Welcome content="Bienvenue, Name!" /> {/* Name from DataBase */}
        <div className={style.notificationContainer}>
          <Graph />
          <Notification addStyle={style.secondNotification} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
