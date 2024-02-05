import { Link } from "react-router-dom";
import "./advertisement.css";
import { advertisementPic } from "../../assets/imgURL";
import { IMAGE_KEY } from "../../data/key";

function Advertisement() {
  return (
    <section className="advertisement">
      <Link to={"/login"}>
        {/* {advertisementPic} */}
        <img
          className="advertisement__img"
          src={`${IMAGE_KEY}/tr:w-1800${advertisementPic}`}
          srcSet={`${IMAGE_KEY}/tr:w-500${advertisementPic} 500w, ${IMAGE_KEY}/tr:w-1050${advertisementPic} 1050w, ${IMAGE_KEY}/tr:w-1800${advertisementPic} 1800w`}
          sizes="(max-width:500px) 500px, (max-width:1050px) 1050px, 1800px"
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
