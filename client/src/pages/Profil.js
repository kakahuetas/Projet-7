import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import ProfilEdit from "../components/ProfilEdit";
import ProfilEditMedia from "../components/ProfilEditMedia";
import UserFeed from "../components/UserFeed";

const Profil = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }
  }, [navigate]);

  const userId = useContext(UserIdContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
      .then((result) => {
        setUser(result.data);
      })

      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <>
      <Navigation />
      <div className="profilContainer">
        <div className="profilHeader">
          <div className="profilUserBlock">
            <div className="profil_media_head_img">
              <img src={user.media} alt="profil" />

              <ProfilEditMedia />
            </div>
            <div className="profil_name">
              <h3>
                {user.firstname} {user.name}
              </h3>
              <h4>{user.service}</h4>
            </div>
          </div>
          <div className="profil_buttons">
            <ProfilEdit />
          </div>
        </div>
        <div className="body_bloc">
          <div className="left_bloc">
            <div className="user_head">
              <h4>Informations</h4>
            </div>
            <div className="user_info-bloc">
              <div className="user_info-row">
                <span>Adresse mail</span>
                <p>{user.email}</p>
              </div>
              <div className="user_info-row">
                <span>Service</span>
                <p>{user.service}</p>
              </div>
            </div>
          </div>
          <div className="right_bloc">
            <div className="post_head">
              <h4>Posts</h4>
            </div>
            <div className="post_">
              <div className="allUserPosts">
                <UserFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil;
