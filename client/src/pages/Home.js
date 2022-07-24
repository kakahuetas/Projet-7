import { useEffect } from "react";
import React from "react";
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
        <h1>Affichage des post</h1> <br />
      </div>
    </>
  );
};

export default Home;
