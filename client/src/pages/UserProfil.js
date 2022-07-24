import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfil = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);

  console.log(id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/message/profil/` + id)
      .then((result) => {
        setMessage(result.data);
        console.log(result.data);
      });
  }, []);

  return (
    <div className="feedContainer">
      {message.length &&
        message.map((message, index) => {
          return (
            <>
              <div className="feedTitle">
                <div className="feedTitle_img">img</div>
                <div className="feedTitle_user">
                  <div className="feedTitle_user-name">
                    {/* {article.name}-{article.firstname} */}
                  </div>
                  <div className="feedTitle_user-date">
                    <span key={`date-${index}`}>{message.createdAt}</span>
                  </div>
                </div>
                <div className="feedTitle_edit">Edit</div>
              </div>
              <div className="feedContent">
                <span key={`message-${index}`}>{message.texte}</span>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default UserProfil;
