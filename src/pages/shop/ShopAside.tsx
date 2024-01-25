import React from "react";
import { Link } from "react-router-dom";
import "./shopaside.css";

type Props = {};

function ShopAside({}: Props) {
  return (
    <aside className="shop__aside">
      <p>filter aside here</p>
      <p>name Filter</p>
      <p>color Filter</p>
      <p>price Filter</p>
      <p>sale Filter</p>
    </aside>
  );
}

export default ShopAside;
