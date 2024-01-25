import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo192.png";
import SearchBar from "./SearchBar";

function Navbar() {
  /* category lists modal */
  const [IsModalOpen, setIsModalOpen] = useState(false);

  /* check if user has pressed the modal */
  function focusOnTarget(e: any) {
    if (
      !e?.target?.className.includes("nav__cloth__btn--clothes") &&
      !e?.target?.offsetParent?.className.includes("nav__lists--active")
    ) {
      setIsModalOpen(false);
    } else {
    }
  }

  function modalOpenHandler() {
    setIsModalOpen((prev) => !prev);
  }

  /* add and remove click event handler */
  useEffect(() => {
    if (IsModalOpen) {
      document.addEventListener("click", focusOnTarget);
    }
    if (!IsModalOpen) {
      document.removeEventListener("click", focusOnTarget);
    }
    return () => document.removeEventListener("click", focusOnTarget);
  }, [IsModalOpen]);

  return (
    <header>
      <div className="wrapper">
        <nav>
          <div className="nav__top">
            <Link className="nav__logo" to={"/"}>
              <img src={logo} alt="SIP logo" />
            </Link>
            <SearchBar />
          </div>
          <div className="nav__flex">
            <ul className="nav__content">
              <li>
                <div>
                  <Link to={"/"}>HOME</Link>
                </div>
              </li>
              <li>
                <div className="nav__cloth">
                  <button
                    className={`nav__cloth__btn--clothes ${
                      IsModalOpen && "nav__cloth__btn--clothes--active"
                    }`}
                    onClick={modalOpenHandler}
                    tabIndex={0}
                  >
                    CLOTHES
                  </button>
                </div>
              </li>
              <li>
                <div>
                  <Link to={"/"}>CAREER</Link>
                </div>
              </li>
              <li>
                <div>
                  <Link to={"/contact"}>CONTACT</Link>
                </div>
              </li>
            </ul>
            <ul className="nav__content">
              <li>
                <Link to={"/favorite"} className="svg-heart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link to={"/purchase"} className="svg-purchase">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="svg-login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className={`nav__lists ${IsModalOpen && "nav__lists--active"}`}
        tabIndex={0}
      >
        <div className="wrapper">
          <div className="nav__lists__box">
            <div className="nav__lists__category">
              <p>COAT</p>
            </div>
            <Link onClick={modalOpenHandler} to={"/shop/coat-men"}>
              MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/coat-women"}>
              WOMEN
            </Link>
          </div>
          <div className="nav__lists__box">
            <div className="nav__lists__category">
              <p>SHIRT</p>
            </div>
            <Link onClick={modalOpenHandler} to={"/shop/shirt-men"}>
              MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/shirt-women"}>
              WOMEN
            </Link>
          </div>
          <div className="nav__lists__box">
            <div className="nav__lists__category">
              <p>HOODIE</p>
            </div>
            <Link onClick={modalOpenHandler} to={"/shop/hoodie-men"}>
              MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/hoodie-women"}>
              WOMEN
            </Link>
          </div>
          <div className="nav__lists__box">
            <div className="nav__lists__category">
              <p>SWEATER</p>
            </div>
            <Link onClick={modalOpenHandler} to={"/shop/sweater-men"}>
              MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/sweater-women"}>
              WOMEN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
