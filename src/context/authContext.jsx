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

  const signInUser = async (username, password) => {
    const url = "http://localhost/unmg_pms/api/signInUser.php";
    //const url = "../api/signInUser.php";
    let formData = new FormData();
    formData.append("user_login", username);
    formData.append("password", password);

    try {
      const response = await axios.post(url, formData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
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
          id: id,
        },
      });
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const fetchUsers = async () => {
    let url = "http://localhost/unmg_pms/api/retrieveUsers.php";
    //let url = "../api/retrieveUsers.php";
    try {
      const response = await axios.get(url, {
        params: {
          users: "regular"
        }
      });
      if (response.status === 200) {
        return response.data;
      }else{
        return 1;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const addCompany = async (companyData) => {
    const url = "http://localhost/unmg_pms/api/manageCompany.php";
    //const url = "../api/manageCompany.php";
    const formData = new FormData();
    formData.append("add_company", true);
    formData.append("company_data", JSON.stringify(companyData));

    try {
      const response = await axios.post(url, formData);
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addDepartment = async (companyID, department_list) => {
    const url = "http://localhost/unmg_pms/api/manageCompany.php";
    //const url = "../api/manageCompany.php";
    const formData = new FormData();
    formData.append("add_department", true);
    formData.append("company_id", companyID);
    formData.append("department_list", JSON.stringify(department_list));

    try {
      const response = await axios.post(url, formData);
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDepartment = async (departmentID) => {
    const url = "http://localhost/unmg_pms/api/manageCompany.php";
    //const url = "../api/manageCompany.php";
    const formData = new FormData();
    formData.append("delete_department", true);
    formData.append("departmentID", departmentID);

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      // if (response.data === "success") {
      //   return true;
      // }
    } catch (e) {
      console.log(e);
    }
  };
  const getBusinessUnits = async () => {
    const url = "http://localhost/unmg_pms/api/conglomerate.php";
    //const url = "../api/conglomerate.php";
    try {
      const response = await axios.get(url, {
        params: {
          company: true,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDepartments = async () => {
    const url = "http://localhost/unmg_pms/api/conglomerate.php";
    //const url = "../api/conglomerate.php";
    try {
      const response = await axios.get(url, {
        params: {
          department: true,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const manageUser = async (action, id) => {
    const url = "http://localhost/unmg_pms/api/userActions.php";
    //const url = "../api/userActions.php";
    const formData = new FormData();
    formData.append("action", action);
    formData.append("user_id", id);

    try {
      const response = await axios.post(url, formData);
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const navigate = (location) => {
    nav(location);
  };

  const registerRole = async (role_data) => {
    const url = "http://localhost/unmg_pms/api/manageRoles.php";
    //const url = "../api/manageRoles.php";
    const formData = new FormData();
    formData.append("action", "register");
    formData.append("role_data", JSON.stringify(role_data));

    try {
      const response = await axios.post(url, formData);
      return response.data === "success";
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateUserRole = async (user_id, role_id) => {
    const url = "http://localhost/unmg_pms/api/manageRoles.php";
    //const url = "../api/manageRoles.php";
    const formData = new FormData();
    formData.append("action", "update");
    formData.append("user_id", user_id);
    formData.append("role_id", role_id);

    try {
      const response = await axios.post(url, formData);
      return response.data === "success";
    } catch (e) {
      console.log(e.message);
    }
  };
  const unassignUser = async (user_id) => {
    const url = "http://localhost/unmg_pms/api/manageRoles.php";
    //const url = "../api/manageRoles.php";
    const formData = new FormData();
    formData.append("action", "remove");
    formData.append("user_id", user_id);

    try {
      const response = await axios.post(url, formData);
      return response.data === "success";
    } catch (e) {
      console.log(e.message);
    }
  };
  const deleteRole = async (roleList) => {
    const url = "http://localhost/unmg_pms/api/manageRoles.php";
    //const url = "../api/manageRoles.php";
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("roles", JSON.stringify(roleList));

    try {
      const response = await axios.post(url, formData);
      return response.data === "success";
    } catch (e) {
      console.log(e.message);
    }
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
    departmentList,
    usertypeList,
    currentUser,
    companyList,
    headList,
    nav,
    navigate,
    manageUser,
    signInUser,
    addCompany,
    updateUser,
    fetchUsers,
    deleteRole,
    registerUser,
    registerRole,
    unassignUser,
    addDepartment,
    updateUserRole,
    getDepartments,
    setCurrentUser,
    getBusinessUnits,
    deleteDepartment,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}