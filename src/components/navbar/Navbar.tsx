import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo192.png";

function Navbar() {
  /* category lists modal */
  const [IsModalOpen, setIsModalOpen] = useState(false);

  /* check if user has pressed the modal */
  function focusOnTarget(e: any) {
    if (
      !e.target?.className.includes("nav__cloth__btn--clothes") &&
      !e.target?.offsetParent?.className.includes("nav__lists--active")
    ) {
      setIsModalOpen(false);
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
          <Link to={"/"}>
            <img className="nav__logo" src={logo} alt="SIP logo" />
          </Link>
          <div className="nav__flex">
            {/* flex line 1 */}

            <ul className="nav__content">
              {/* home */}
              <li>
                <div>
                  <Link to={"/"}>HOME</Link>
                </div>
              </li>
              {/* shop */}
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
              {/* career */}
              <li>
                <div>
                  <Link to={"/"}>CAREER</Link>
                </div>
              </li>
              {/* contact */}
              <li>
                <div>
                  <Link to={"/contact"}>CONTACT</Link>
                </div>
              </li>
            </ul>
            {/* flex line 2 */}
            <ul className="nav__content">
              <li>
                <Link to={"/favorite"}>Fav</Link>
              </li>
              <li>
                <Link to={"/purchase"}>PURCHASE</Link>
              </li>
              <li>
                <Link to={"/login"}>LOGIN</Link>
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
