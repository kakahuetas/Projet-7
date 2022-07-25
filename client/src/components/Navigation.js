import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";
import Logo from "./Logo";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu");
  toggleMenu.classList.toggle("active");
};

const Navigation = () => {
  const userId = useContext(UserIdContext);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const userinfo = async () => {
    if (!localStorage.token) {
      navigate("/login");
    }
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
      .then((result) => {
        console.log(result.data);
        setUser(result.data);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    userinfo();
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
