import React, { useContext, useEffect, useState } from "react";
import ProfilEditForm from "./ProfilEditForm";
import { useParams } from "react-router-dom";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";

const menuToggle1 = () => {
  const toggleMenu = document.querySelector(".profil_menu_edit");
  toggleMenu.classList.toggle("active_edit");
};

const ProfilEdit = () => {
  const { id } = useParams();
  const userId = useContext(UserIdContext);
  const [user, setUser] = useState([]);

  const userinfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
      .then((result) => {
        setUser(result.data);
        console.log(result.data);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    userinfo();
  }, [userId]);

  if (id === JSON.stringify(userId) || user.isAdmin === true)
    return (
      <div className="action_edit">
        <div className="profil_buttons_edit">
          <button className="editButton" onClick={menuToggle1}>
            Editer mon profil
          </button>
        </div>
        <div className="profil_menu_edit">
          <ProfilEditForm />
        </div>
      </div>
    );
};

export default ProfilEdit;
