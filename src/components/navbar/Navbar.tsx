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
        {/* flex 1 */}
        <div>
          <ul>
            {/* home */}
            <li>
              <div>
                <Link to={"/"}>HOME</Link>
              </div>
            </li>
            {/* shop */}
            <li>
              <div>
                <div>CLOTHES</div>
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
            {/* contact */}
            <li>
              <div>
                <Link to={"/contact"}>CONTACT</Link>
              </div>
            </li>
          </ul>
        </div>
        {/* flex 2 */}
        <div>
          <div>
            <Link to={"/favorite"}>Fav</Link>
          </div>
          <div>
            <Link to={"/purchase"}>PURCHASE</Link>
          </div>
          <div>
            <Link to={"/login"}>LOGIN</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
