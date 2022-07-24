import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        email,
        password,
      },
    })
      .then((result) => {
        console.log(result.data);
        localStorage.token = result.data.token;
        axios.defaults.headers.common.Authorization =
          "Bearer " + result.data.token;
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form action="" onSubmit={handleLogin} id="form_signup">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        className="input_signup"
        id="email"
        placeholder="Entrer votre email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <div className="email-error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        className="input_signup"
        id="password"
        placeholder="Entrer votre mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <div className="password-error"></div>
      <br />
      <input type="submit" className="submit" value="Se connecter" />
    </form>
  );
};

export default Loginform;
