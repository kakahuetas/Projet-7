import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfilEditForm = () => {
  const { id } = useParams();

  const [firstname, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");

  const handleEditForm = (e) => {
    e.preventDefault();
    const firstnameError = document.querySelector(".firstname.error");
    const nameError = document.querySelector(".name.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const serviceError = document.querySelector(".service.error");
    if (!firstname || !name || !email || !password || !service) {
      alert("veuillez remplir tous les champs du formulaire");
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/` + id,
        credentials: "include",
        data: {
          firstname,
          name,
          email,
          password,
          service,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            firstnameError.innerHTML = res.data.firstnameError;
            nameError.innerHTML = res.data.nameError;
            emailError.innerHTML = res.data.emailError;
            passwordError.innerHTML = res.data.passwordError;
            serviceError.innerHTML = res.data.serviceError;
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form action="" onSubmit={handleEditForm}>
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        name="name"
        className="input_signup"
        id="name"
        placeholder="Entrer votre nom"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <br />
      <label htmlFor="firstname">Prénom</label>
      <input
        type="text"
        name="firstname"
        className="input_signup"
        id="firstname"
        placeholder="Entrer votre prénom"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstname}
        required
      />
      <br />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className="input_signup"
        id="email"
        placeholder="Entrer votre mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
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
      <br />
      <label htmlFor="password">Service</label>
      <input
        type="text"
        name="service"
        className="input_signup"
        id="service"
        placeholder="Entrer votre service"
        onChange={(e) => setService(e.target.value)}
        value={service}
        required
      />
      <br />
      <input type="submit" className="submit" value="Editer" />
    </form>
  );
};

export default ProfilEditForm;
