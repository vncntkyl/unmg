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
  const [headList, setHeadList] = useState([]);
  const [usertypeList, setUsertypeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const nav = useNavigate();

  const signInUser = (username, password) => {
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
        console.log(e.message);
      });
  };

  const registerUser = async (userdata) => {
    try {
      const url = "http://localhost/unmg_pms/api/registerUser.php";
      //const url = "../api/registerUser.php";
      const response = await axios.post(url, {
        params: {
          userdata: userdata,
        },
      });

      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateUser = async (userdata, id) => {
    try {
      const url = "http://localhost/unmg_pms/api/updateUser.php";
      //const url = "../api/updateUser.php";
      const response = await axios.post(url, {
        params: {
          userdata: userdata,
          id: id
        },
      });
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const manageUser = async (action, id) => {
    const url = "http://localhost/unmg_pms/api/userActions.php";
    //const url = "../api/userActions.php";
    const formData = new FormData();
    formData.append("action", action);
    formData.append("user_id", id)
    
    try {
      const response = await axios.post(url, formData);
      if(response.data === "success"){
        return true;
      }
    } catch (e) {
      console.log(e)
    }
  }
  const navigate = (location) => {
    nav(location);
  };
  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      setCurrentUser(sessionStorage.getItem("currentUser"));
    }
    const url = "http://localhost/unmg_pms/api/conglomerate.php";
    //const url = "../api/conglomerate.php";

    axios
      .get(url, {
        params: {
          company: true,
        },
      })
      .then((response) => {
        setCompanyList(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });

    axios
      .get(url, {
        params: {
          department: true,
        },
      })
      .then((response) => {
        setDepartmentList(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
    const fetchHeads = async () => {
      let url = "http://localhost/unmg_pms/api/retrieveUsers.php";
      //let url = "../api/retrieveUsers.php";
      try {
        const response = await axios.get(url, {
          params: {
            heads: true,
          },
        });

        setHeadList(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    const retrieveUserTypes = async () => {
      try {
        const url = "http://localhost/unmg_pms/api/retrieveUsers.php";
        //const url = "../api/retrieveUsers.php";
        const response = await axios.get(url, {
          params: {
            usertype: true,
          },
        });
        setUsertypeList(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchHeads();
    retrieveUserTypes();
  }, [currentUser]);

  const value = {
    currentUser,
    companyList,
    departmentList,
    headList,
    usertypeList,
    nav,
    navigate,
    manageUser,
    signInUser,
    updateUser,
    registerUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
