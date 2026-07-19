import React, { useState, useRef } from "react";
import style from "./SearchBarWithSuggestions.module.css";
import { NavLink } from "react-router-dom";

const SearchBarWithSuggestions = ({ links }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleFocus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFocused(false);
    }, 200); // Delay to allow click event
  };

  const filteredLinks = searchTerm
    ? links.filter((link) => link.name.toLowerCase().includes(searchTerm))
    : links;

  return (
    <div className={style.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Rechercher ici"
        className={style.searchInput}
      />
      {(isFocused || searchTerm) && filteredLinks.length > 0 && (
        <div className={style.suggestionsList}>
          {filteredLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.url}
              className={style.suggestionItem}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
