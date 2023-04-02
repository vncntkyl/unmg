import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const nav = useNavigate();

  function signInUser(username, password) {
    const url = "http://localhost/unmg_pms/api/signInUser.php";
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post(url, formData)
      .then((response) => {
        setCurrentUser(response.data);
        sessionStorage.setItem("currentUser", response.data);
        nav("/");
      })
      .catch((e) => {
        alert(e);
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      setCurrentUser(sessionStorage.getItem("currentUser"));
    }
  }, []);

  const value = {
    currentUser,
    nav,
    signInUser,
    setCurrentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
