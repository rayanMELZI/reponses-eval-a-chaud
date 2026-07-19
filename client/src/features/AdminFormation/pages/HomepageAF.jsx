import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import style from "./HomepageAF.module.css";
import Welcome from "../components/Welcome";
import Notification from "../components/Notification";
import Footer from "../components/Footer";
import Graph from "../components/Graph";

import axios from "axios";
import { useState, useEffect } from "react";

export default function HomepageAF() {
  const fullUsersData = JSON.parse(localStorage.getItem("fullUsersData"));
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/adminFormationStatistics`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching formations statistics:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    console.log(fullUsersData);
  }, [fullUsersData]);

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
        <Welcome content={`Bienvenue, ${fullUsersData.prenom}!`} change />
        <div className={style.notificationContainer}>
          <Graph statistics={statistics} />
          <Notification statistics={statistics} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
