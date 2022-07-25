import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfilDeleteForm = () => {
  const { id } = useParams();

  const handleDeleteForm = (e) => {
    e.preventDefault();

    axios
      .delete(`${process.env.REACT_APP_API_URL}api/user/` + id)
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })

      .catch((error) => console.log(error));
  };

  return (
    <>
      <form action="" className="input_media" onSubmit={handleDeleteForm}>
        <label htmlFor="warning" className="warning">
          Attention cette action est irréverssible !
        </label>
        <br />
        <input type="submit" className="submit" value="Supprimer" />
      </form>
    </>
  );
};

export default ProfilDeleteForm;
