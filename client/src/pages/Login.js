import React from "react";
import Logo from "../components/Logo";

const Login = () => {
  return (
    <div className="loginpage">
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
          <div className="login_form">
            <h1>Connexion</h1>
            <p>
              Entrer votre mail ainsi que votre mot de passe, pour accèder au
              réseau social de l'entreprise
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
