import { Link } from "react-router-dom";
import "./advertisement.css";
import photo from "./assets/ad1.jpg";

function Advertisement() {
  return (
    <section className="advertisement">
      <Link to={"/login"}>
        <img
          className="advertisement__img"
          src={photo}
          alt="person holding a phone"
        />
      </Link>
      <div className="advertisement__text">
        <h4>Membership Card</h4>
        <p>SAVE 20% with our Membership Card</p>
      </div>
    </section>
  );
}

export default Advertisement;
