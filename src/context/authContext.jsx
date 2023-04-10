import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [companyList, setCompanyList] = useState([]);
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
  
  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      setCurrentUser(sessionStorage.getItem("currentUser"));
    }
    //const url = "../api/conglomerate.php";
    const url = "http://localhost/unmg_pms/api/conglomerate.php";
    axios
      .get(url)
      .then((response) => {
        setCompanyList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentUser]);

  const value = {
    currentUser,
    companyList,
    nav,
    signInUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
