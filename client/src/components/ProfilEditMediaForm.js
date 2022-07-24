import React, { useContext } from "react";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";

const ProfilEditMediaForm = () => {
  const userId = useContext(UserIdContext);

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("media", selectedFile);
    try {
      const response = axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <form action="" className="input_media" onSubmit={handleSubmit}>
        <label htmlFor="file">Changer votre photo de profil</label>
        <input
          type="file"
          name="media"
          onChange={handleFileSelect}
          accept=".jpg, .jpeg, .png, .gif"
        />

        <br />
        <input type="submit" className="submit" value="Envoyer" />
      </form>
    </>
  );
};

export default ProfilEditMediaForm;
