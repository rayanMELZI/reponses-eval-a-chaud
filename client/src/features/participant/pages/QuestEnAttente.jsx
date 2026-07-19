import Footer from "../component/Footer";
import Header from "../component/Header";
import QuestDetails from "../component/QuestDetails";
import Sidebar from "../component/Sidebar";
import Titre from "../components/Titre";
import style from "./QuestEnAttente.module.css";
import SearchBar from "../components/SearchBar";

import { useState } from "react";
export default function QuestEnAttente() {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);

  const handleSearch = (filteredResults) => {
    setFilteredFormations(filteredResults);
  };

  return (
    <div className={style.container}>
      <Header />
      <Sidebar />
      <Titre
        component={<SearchBar data={formations} onSearch={handleSearch} />}
      />
      <QuestDetails
        formations={filteredFormations}
        setFormations={setFormations}
        setFilteredFormations={setFilteredFormations}
      />
      <Footer />
    </div>
  );
}
