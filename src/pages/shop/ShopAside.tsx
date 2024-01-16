import React from "react";
import { Link } from "react-router-dom";

type Props = {};

function ShopAside({}: Props) {
  return (
    <aside>
      <div>
        COAT
        <Link to="/shop/coat-men">men</Link>
        <Link to="/shop/coat-women">women</Link>
      </div>
      <div>
        SHIRT
        <Link to="/shop/shirt-men">men</Link>
        <Link to="/shop/shirt-women">women</Link>
      </div>
      <div>
        HOODIE
        <Link to="/shop/hoodie-men">men</Link>
        <Link to="/shop/hoodie-women">women</Link>
      </div>
      <div>
        SWEATER
        <Link to="/shop/sweater-men">men</Link>
        <Link to="/shop/sweater-women">women</Link>
      </div>
    </aside>
  );
}

export default ShopAside;
