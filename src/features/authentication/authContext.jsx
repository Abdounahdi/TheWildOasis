import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUserApi } from "../../services/apiUsers";

const authContext = createContext();

const initialUser = false;

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(initialUser);

  if (user) {
    sessionStorage.setItem("token", JSON.stringify(user));
  }

  useEffect(function () {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setUser(data);
      console.log("the user was already here ");
      navigate("/");
    }
  }, []);

  function signIn(userObj) {
    setUser(userObj);
  }

  function signOut() {
    setUser(initialUser);
    logOutUserApi();
    sessionStorage.clear();
  }

  // function updateUserState(obj) {
  //   console.log(user);
  //   setUser((state) => {
  //     return {
  //       ...state,
  //       user_metadata: {
  //         ...state.user_metadata,
  //         full_name: obj.fullName,
  //         image: obj.avatar,
  //       },
  //     };
  //   });
  // }

  return (
    <authContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </authContext.Provider>
  );
}

export { AuthProvider, authContext };
