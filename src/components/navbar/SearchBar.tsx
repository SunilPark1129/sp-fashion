import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestNames } from "../../redux/features/getName";
import { AppDispatch, RootState } from "../../redux/store";
import "./searchbar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [filteredLists, setFilteredLists] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data, error } = useSelector((state: RootState) => state.getNames);

  useEffect(() => {
    dispatch(requestNames());
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length !== 0 && hasFocus) {
      /* find all names if item is related with searched term */
      const regexp = new RegExp(
        `\\b${searchTerm.replace(/\s+/g, ".*")}.*\\b`,
        "i"
      );
      const temp = data.filter((name) => name.match(regexp));
      setFilteredLists(temp.slice(0, 6));
      setHasFocus(true);
    } else {
      setFilteredLists([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (hasFocus) {
      document.addEventListener("click", focusOnTarget);
    }
    if (!hasFocus) {
      document.removeEventListener("click", focusOnTarget);
    }
    return () => document.removeEventListener("click", focusOnTarget);
  }, [hasFocus]);

  /* check if user has pressed the modal */
  function focusOnTarget(e: any) {
    if (
      !e?.target?.className.includes("searchbar__input") &&
      !e?.target?.className.includes("searchbar__lists__item") &&
      !e?.target?.className.includes("nav__flex")
    ) {
      setHasFocus(false);
    }
  }

  function keyDownHandler(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      searchClickHandler(null);
    }
  }

  function listClickHandler(item: string) {
    setSearchTerm(item);
    setHasFocus(false);
    searchClickHandler(item);
  }

  /* pass searched term to other route location */
  function searchClickHandler(item: string | null) {
    if (searchTerm.trim().length === 0) return;
    navigate(`/search?term=${!item ? searchTerm : item}`);
  }

  return (
    <div
      className="searchbar"
      onFocus={() => setHasFocus(true)}
      onKeyDown={keyDownHandler}
    >
      <input
        className="searchbar__input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Clothes"
        autoComplete="off"
      />
      <div className="searchbar__icon" onClick={() => searchClickHandler(null)}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2122 7.52637C14.1464 8.88311 13.6912 10.1288 12.9599 11.1605L17.3741 15.841L15.3753 17.7261L10.9567 13.0408C9.81642 13.7452 8.45862 14.1239 7.01875 14.054C3.22976 13.8702 0.30722 10.6496 0.491075 6.86057C0.67493 3.07158 3.89556 0.149044 7.68454 0.3329C11.4735 0.516755 14.3961 3.73738 14.2122 7.52637ZM7.15187 11.3098C9.42526 11.4201 11.3576 9.6666 11.468 7.39321C11.5783 5.11982 9.82474 3.18744 7.55135 3.07713C5.27796 2.96681 3.34558 4.72034 3.23527 6.99373C3.12496 9.26712 4.87848 11.1995 7.15187 11.3098Z"
            fill="black"
          />
        </svg>
      </div>
      {hasFocus && !error && filteredLists.length !== 0 && (
        <ul className="searchbar__lists">
          {filteredLists.map((item) => (
            <li
              className="searchbar__lists__item"
              key={item}
              onClick={() => listClickHandler(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
