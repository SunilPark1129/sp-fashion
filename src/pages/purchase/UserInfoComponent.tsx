import { Link } from "react-router-dom";

export default function UserInfoComponent() {
  return (
    <section className="purchase__form__step__page purchase__form__user">
      <div>
        <h2>User Info</h2>
      </div>
      <div className="purchase__form__user__content">
        <p>For a safer and faster delivery, customers need to log in.</p>
        <Link to={"/login"}>SIGN IN</Link>
      </div>
    </section>
  );
}
