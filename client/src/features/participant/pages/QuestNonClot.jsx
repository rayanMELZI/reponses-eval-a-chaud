import style from "./QuestNonClot.module.css";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Titre from "../components/Titre";
import QuestDetails from "../component/QuestDetails";
import Footer from "../component/Footer";
import SearchBar from "../components/SearchBar";

import { useState } from "react";
export default function QuestNonClot() {
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
        color="#302CD780"
        isCloture={false}
        formations={filteredFormations}
        setFormations={setFormations}
        setFilteredFormations={setFilteredFormations}
      />
      <Footer />
    </div>
  );
}
