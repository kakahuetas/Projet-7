import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../context/UserContext";

const Feeds = () => {
  useEffect(() => {
    getMessages();
  }, []);

  const [messages, setMessages] = useState([]);
  const userId = useContext(UserIdContext);

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/message/`
      );
      console.log(res.data);
      setMessages(res.data.results);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div>
            {/* {message.UserId}
            {message.createdAt}
            {message.content} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feeds;
