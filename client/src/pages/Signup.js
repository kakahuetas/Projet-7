import React from "react";
import Logo from "../components/Logo";
import Signupform from "../components/Signupform";

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="circle">
        <div className="circle-small pulsate-bck"></div>
        <div className="circle-medium pulsate-bck"></div>
        <div className="circle-large pulsate-bck"></div>
        <div className="circle-xlarge pulsate-bck"></div>
      </div>
      <div className="container">
        <div className="container_left">
          <p>Bienvenue chez</p>
          <Logo />
        </div>
        <div className="container_right">
          <div className="signup_form">
            <h1>Inscription</h1>
            <div className="signup_form-formulaire">
              <Signupform />
            </div>
            <div className="signup_form-login">
              <p>Vous avez déjà une compte ?</p>
              <a href="/login">Connexion</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
