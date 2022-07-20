import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Si l'url ne renvoi a rien on renvoi par defaut home */}
        <Route path="*" element={<Home />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;