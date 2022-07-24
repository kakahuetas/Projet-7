import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Profil from "../../pages/Profil";
import Signup from "../../pages/Signup";

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil/:id" element={<Profil />} />
        {/* Si l'url ne renvoi a rien on renvoi par defaut home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
