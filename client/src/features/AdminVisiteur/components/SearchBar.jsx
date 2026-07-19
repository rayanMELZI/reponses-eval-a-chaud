import React, { useState } from "react";
import style from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ icon, border, data, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );
    onSearch(filteredData);
  };

  return (
    <div style={border ?? border}>
      {icon === undefined || icon === false ? null : (
        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}
      <input
        type="search"
        placeholder="Rechercher ici"
        value={searchTerm}
        onChange={handleSearch}
        className={style.searchBar}
      />
    </div>
  );
}

export default SearchBar;
