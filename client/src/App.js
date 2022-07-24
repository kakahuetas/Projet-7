import { useEffect, useState } from "react";
import { UserIdContext } from "./context/UserContext";
import Routes from "./components/Routes";
import jwtdecode from "jwt-decode";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token === null) {
      console.log("No token, no userId");
    } else {
      console.log(token);
      const decodeToken = jwtdecode(token);
      const userToken = decodeToken.userId;
      setUserId(userToken);
      console.log("userId:", userToken);
    }
  }, []);
  return (
    <UserIdContext.Provider value={userId}>
      <Routes />
    </UserIdContext.Provider>
  );
};

export default App;
