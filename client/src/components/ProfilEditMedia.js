import React from "react";
import ProfilEditMediaForm from "../components/ProfilEditMediaForm";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu_edit_media");
  toggleMenu.classList.toggle("active_edit_media");
};

const ProfilEditMedia = () => {
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
