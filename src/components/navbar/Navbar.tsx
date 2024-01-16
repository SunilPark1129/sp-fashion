import React from "react";
import Home from "../../pages/home/Home";
import Shop from "../../pages/shop/Shop";
import Purchase from "../../pages/purchase/Purchase";
import Contact from "../../pages/contact/Contact";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <div>
              <Link to={"/"}>HOME</Link>
            </div>
          </li>
          <li>
            <div>
              <div>
                <div>COAT</div>
                <Link to={"/shop/coat-men"}>COAT - MEN</Link>
                <Link to={"/shop/coat-women"}>COAT - WOMEN</Link>
              </div>
              <div>
                <div>SHIRT</div>
                <Link to={"/shop/shirt-men"}>SHIRT - MEN</Link>
                <Link to={"/shop/shirt-women"}>COAT - WOMEN</Link>
              </div>
              <div>
                <div>HOODIE</div>
                <Link to={"/shop/hoodie-men"}>HOODIE - MEN</Link>
                <Link to={"/shop/hoodie-women"}>HOODIE - WOMEN</Link>
              </div>
              <div>
                <div>SWEATER</div>
                <Link to={"/shop/sweater-men"}>SWEATER - MEN</Link>
                <Link to={"/shop/sweater-women"}>SWEATER - WOMEN</Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
