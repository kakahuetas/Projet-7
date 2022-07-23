import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Navigation />
      <div className="bodyContainer">
        <h1>je suis a l'accueil une fois connecter</h1>
      </div>
    </>
  );
};

export default Home;
