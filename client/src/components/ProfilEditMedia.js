import React, { useContext, useEffect, useState } from "react";
import ProfilEditMediaForm from "../components/ProfilEditMediaForm";
import { useParams } from "react-router-dom";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu_edit_media");
  toggleMenu.classList.toggle("active_edit_media");
};

const ProfilEditMedia = () => {
  const { id } = useParams();
  const userId = useContext(UserIdContext);
  const [user, setUser] = useState([]);

  const userinfo = () => {
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
      <div className="action_edit_media">
        <div className="profil_buttons_edit_media">
          <button className="editProfilMedia" onClick={menuToggle}>
            +
          </button>
        </div>
        <div className="profil_menu_edit_media">
          <ProfilEditMediaForm />
        </div>
      </div>
    );
};

export default ProfilEditMedia;
