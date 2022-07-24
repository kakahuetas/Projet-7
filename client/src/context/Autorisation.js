import axios from "axios";

const api = `${process.env.REACT_APP_API_URL}api`;
const token = JSON.parse(sessionStorage.getItem("token"));
axios
  .get(api, { headers: { Authorization: `Bearer ${token}` } })
  .then((res) => console.log(res.data))
  .catch((error) => {
    console.log(error);
  });
