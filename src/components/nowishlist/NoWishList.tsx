import "./nowishlist.css";
import { Link } from "react-router-dom";

export default function NoWishListFound() {
  return (
    <div className="no-data no-data--fav">
      <div className="wrapper">
        <div className="container">
          <h3>Wishlist is Empty</h3>
          <p>Sign in to sync your Saved Items across all your devices.</p>
          <Link to="/login">SIGN IN</Link>
        </div>
      </div>
    </div>
  );
}
