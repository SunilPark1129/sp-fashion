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
    if (searchTerm.trim().length !== 0) {
      /* find all names if item is related with searched term */
      const regexp = new RegExp(
        `\\b${searchTerm.replace(/\s+/g, ".*")}.*\\b`,
        "i"
      );
      const temp = data.filter((name) => name.match(regexp));
      setFilteredLists(temp.slice(0, 6));
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

  /* pass searched term to other route location */
  function listClickHandler(item: string) {
    setSearchTerm(item);
    setHasFocus(false);
    navigate("/shop/coat-women");
  }

  return (
    <div className="searchbar" onFocus={() => setHasFocus(true)}>
      <input
        className="searchbar__input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Clothes"
        autoComplete="off"
      />
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
