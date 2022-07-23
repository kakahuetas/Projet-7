import React, { useState } from "react";
import axios from "axios";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    if (!email || !password) {
      alert("veuillez remplir tous les champs du formulaire");
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withcredentials: false,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.error) {
            emailError.innerHTML = res.data.error;
            passwordError.innerHTML = res.data.error.password;
          } else {
            window.location = "/";
            localStorage.token = res.data.token;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
