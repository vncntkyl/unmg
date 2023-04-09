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
    //const url = "../api/signInUser.php";
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post(url, formData)
      .then((response) => {
        setCurrentUser(JSON.stringify(response.data));
        sessionStorage.setItem("currentUser", JSON.stringify(response.data));
        nav("/");
      })
      .catch((e) => {
        alert(e);
      });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function splitPath(path) {
    return path.split("/");
  }
  function capitalizePath(path) {
    const split = splitPath(path);
    let capitalizedPath = "";
    split.slice(1).forEach((s) => {
      capitalizedPath += "/" + capitalize(s);
    });

    return capitalizedPath.substring(1);
  }
  function getPath() {
    return window.location.pathname;
  }

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      setCurrentUser(sessionStorage.getItem("currentUser"));
    }
  }, [currentUser]);

  const value = {
    currentUser,
    nav,
    signInUser,
    setCurrentUser,
    capitalize,
    splitPath,
    getPath,
    capitalizePath
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
