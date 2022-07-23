import React from "react";
import Logo from "./Logo";
import Picture from "../asset/vegeta.jpg";
import Logout from "./Logout";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu");
  toggleMenu.classList.toggle("active");
};

const Navigation = () => {
  return (
    <div className="Navheader">
      <div className="logo">
        <Logo />
      </div>
      <div className="action">
        <div className="profil" onClick={menuToggle}>
          <img src={Picture} alt="profil" />
        </div>
        <div className="profil_menu">
          <h3>
            Prenom <br />
            <span>Service</span>
          </h3>

          <ul>
            <li>
              <a href="/profil">Mon profil</a>
            </li>
            <Logout />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
