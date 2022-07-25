import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import roule from "../asset/roule.png";

const UserFeed = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState([]);

  const userinfo = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + id)
      .then((result) => {
        setUser(result.data);
      })

      .catch((error) => console.log(error));
  };

  const userMessage = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/message/profil/` + id)
      .then((result) => {
        setMessage(result.data);
        console.log(result.data);
      });
  };

  useEffect(() => {
    userinfo();
    userMessage();
  }, [id]);

  if (message.length === 0)
    return (
      <div>
        <div className="feedContainer">
          <div className="noMessage">
            <div className="roll-in-right">
              <img src={roule} alt="" />
            </div>
            <span>
              Malheureusement {user.firstname} n'a fait aucun post pour le
              moment! 😥
            </span>
          </div>
        </div>
      </div>
    );
  else
    return (
      <>
        {message.length &&
          message.map((message, index) => {
            return (
              <div className="feedContainer" key={message.id}>
                <div className="feedTitle">
                  <div className="feedTitle_img">
                    <img src={user.media} alt="profil" />
                  </div>
                  <div className="feedTitle_user">
                    <div className="feedTitle_user-name">
                      {user.firstname} {user.name}
                    </div>
                    <div className="feedTitle_user-date">
                      <span key={`date-${index}`}>{message.createdAt}</span>
                    </div>
                    <div className="feetTitle_user-service">{user.service}</div>
                  </div>
                  <div className="feedTitle_edit">Edit</div>
                </div>
                <div className="feedContent">
                  <span key={`message-${index}`}>{message.texte}</span>
                </div>
                <div className="feeContent_img">
                  <span key={`media-${index}`}>
                    <img src={message.media} alt="" />
                  </span>
                </div>
              </div>
            );
          })}
      </>
    );
};

export default UserFeed;
