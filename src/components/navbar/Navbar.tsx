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
          {/* flex 1 */}
          <div className="nav__content">
            <div className="nav__logo">
              <img src={logo} alt="SIP logo" />
            </div>
            <ul>
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
                    className="nav__cloth__btn--clothes"
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
          </div>
          {/* flex 2 */}
          <div className="nav__content">
            <ul>
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
          <div>
            <div>COAT</div>
            <Link onClick={modalOpenHandler} to={"/shop/coat-men"}>
              COAT - MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/coat-women"}>
              COAT - WOMEN
            </Link>
          </div>
          <div>
            <div>SHIRT</div>
            <Link onClick={modalOpenHandler} to={"/shop/shirt-men"}>
              SHIRT - MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/shirt-women"}>
              COAT - WOMEN
            </Link>
          </div>
          <div>
            <div>HOODIE</div>
            <Link onClick={modalOpenHandler} to={"/shop/hoodie-men"}>
              HOODIE - MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/hoodie-women"}>
              HOODIE - WOMEN
            </Link>
          </div>
          <div>
            <div>SWEATER</div>
            <Link onClick={modalOpenHandler} to={"/shop/sweater-men"}>
              SWEATER - MEN
            </Link>
            <Link onClick={modalOpenHandler} to={"/shop/sweater-women"}>
              SWEATER - WOMEN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
