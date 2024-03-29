import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { bannerData } from "../home/data";

function LoginPage() {
  const [hasValidated, setHasValidated] = useState<boolean | null>(null);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setHasValidated(false);
  }

  return (
    <section className="login">
      <div className="wrapper">
        <div className="container">
          <div className="login__img">
            <img
              src={bannerData[2].image.src}
              srcSet={bannerData[2].image.srcSet}
              sizes={bannerData[2].image.sizes}
              alt="hoodie and pants"
            />
          </div>
          <div className="login__text">
            <div className="login__header">
              <h1>SIGN IN</h1>
            </div>
            <form className="login__form" onSubmit={submitHandler}>
              <div className="login__input-box">
                <label htmlFor="login">
                  EMAIL ID:
                  <input type="email" id="login" autoComplete="off" required />
                </label>
                <label htmlFor="password">
                  PASSWORD:
                  <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <div className="login__validated">
                {hasValidated === false && <p>Invalid Email or Password</p>}
              </div>
              <div className="login__links">
                <div className="login__btn-box">
                  <button type="submit">SIGN IN</button>
                  <button type="button">CREATE NEW</button>
                </div>
                <Link to={"/login"}>Forgot password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
