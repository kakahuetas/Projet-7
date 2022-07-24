import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";
import Logo from "./Logo";
import Logout from "./Logout";
import { Route, Link, Routes } from "react-router-dom";
import Profil from "../pages/Profil";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu");
  toggleMenu.classList.toggle("active");
};

const Navigation = () => {
  const userId = useContext(UserIdContext);

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
      .then((result) => {
        setUser(result.data);
      })

      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <div className="Navheader">
      <div className="logo">
        <Logo />
      </div>
      <div className="action">
        <div className="profil" onClick={menuToggle}>
          <img src={user.media} alt="profil" />
        </div>
        <div className="profil_menu">
          <h3>
            {user.firstname} <br />
            <span> {user.service}</span>
          </h3>

          <ul>
            <li>
              <Link to={`/profil/${user.id}`}>Mon profil</Link>
            </li>
            <Logout />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
