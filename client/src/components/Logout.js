import React from "react";

const Logout = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <li>
      <a href="/logout" onClick={logout}>
        Déconnexion
      </a>
    </li>
  );
};

export default Logout;
