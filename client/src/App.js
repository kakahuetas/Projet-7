import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";

const App = () => {
  // axios.defaults.headers.common["Authorization"] =
  //   "Token " + localStorage.token;
  // console.log(axios.defaults.headers.common["Authorization"]);
  const [uid, setUid] = React.useState(null);
  const dispatch = useDispatch();
  const id = localStorage.getItem("token");
  console.log(id);
  useEffect(() => {
    const token = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/4`,
        withcredentials: false,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No Token", err));
    };
    token();
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Si l'url ne renvoi a rien on renvoi par defaut home */}
        <Route path="*" element={<Home />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
