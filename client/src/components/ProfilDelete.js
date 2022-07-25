import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";
import ProfilDeleteForm from "./ProfilDeleteForm";

const menuToggle2 = () => {
  const toggleMenu = document.querySelector(".profil_menu_delete");
  toggleMenu.classList.toggle("active_delete");
};

const ProfilDelete = () => {
  const { id } = useParams();
  const userId = useContext(UserIdContext);
  const [user, setUser] = useState([]);

  const userinfo = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
      .then((result) => {
        setUser(result.data);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    userinfo();
  }, [userId]);

  if (id === JSON.stringify(userId) || user.isAdmin === true)
    return (
      <div className="action_delete">
        <div className="profil_buttons_delete">
          <button className="deleteButton" onClick={menuToggle2}>
            Supprimer mon profil
          </button>
        </div>
        <div className="profil_menu_delete">
          <ProfilDeleteForm />
        </div>
      </div>
    );
};

export default ProfilDelete;
