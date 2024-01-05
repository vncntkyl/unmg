import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { developmentAPIs as url } from "./apiList";
import axios from "axios";
import { format } from "date-fns";
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
  const [kpiDurations, setKpiDurations] = useState([]);
  const [globalSettings, setGlobalSettings] = useState([]);
  const [verifyIfEvaluator, setVerifyIfEvaluator] = useState(false);
  const nav = useNavigate();
  const signInUser = async (username, password) => {
    let formData = new FormData();
    formData.append("user_login", username);
    formData.append("password", password);

    try {
      const response = await axios.post(url.login, formData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (userdata) => {
    try {
      let fd = new FormData();
      fd.append("userdata", JSON.stringify(userdata));
      const response = await axios.post(url.register, fd);
      console.log(response.data);
      // if (response.data === "success") {
      //   return true;
      // }
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateUser = async (userdata, id) => {
    try {
      const fd = new FormData();
      fd.append("userdata", JSON.stringify(userdata));
      fd.append("id", id);

      const response = await axios.post(url.updateUser, fd);
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(url.retrieveUsers, {
        params: {
          users: true,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return 1;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const addCompany = async (companyData) => {
    const formData = new FormData();
    formData.append("add_company", true);
    formData.append("company_data", JSON.stringify(companyData));

    try {
      const response = await axios.post(url.manageCompany, formData);
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addDepartment = async (companyID, department_list) => {
    const formData = new FormData();
    formData.append("add_department", true);
    formData.append("company_id", companyID);
    formData.append("department_list", JSON.stringify(department_list));

    try {
      const response = await axios.post(url.manageCompany, formData);
      if (response.data === "success") {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDepartment = async (departmentID) => {
    const formData = new FormData();
    formData.append("delete_department", true);
    formData.append("departmentID", departmentID);

    try {
      const response = await axios.post(url.manageCompany, formData);
      console.log(response.data);
      // if (response.data === "success") {
      //   return true;
      // }
    } catch (e) {
      console.log(e);
    }
  };
  const getBusinessUnits = async () => {
    try {
      const response = await axios.get(url.conglomerate, {
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
    try {
      const response = await axios.get(url.conglomerate, {
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
    //const url = "http://localhost/unmg_pms/api/userActions.php";
    //const url = "../api/userActions.php";
    const formData = new FormData();
    formData.append("action", action);
    formData.append("user_id", id);

    try {
      const response = await axios.post(url.userActions, formData);
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
  // const registerRole = async (role_data) => {
  //   const url = "http://localhost/unmg_pms/api/manageRoles.php";
  //   //const url = "../api/manageRoles.php";
  //   const formData = new FormData();
  //   formData.append("action", "register");
  //   formData.append("role_data", JSON.stringify(role_data));

  //   try {
  //     const response = await axios.post(url, formData);
  //     return response.data === "success";
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  // const updateUserRole = async (user_id, role_id) => {
  //   const url = "http://localhost/unmg_pms/api/manageRoles.php";
  //   //const url = "../api/manageRoles.php";
  //   const formData = new FormData();
  //   formData.append("action", "update");
  //   formData.append("user_id", user_id);
  //   formData.append("role_id", role_id);

  //   try {
  //     const response = await axios.post(url, formData);
  //     return response.data === "success";
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  // const unassignUser = async (user_id) => {
  //   const url = "http://localhost/unmg_pms/api/manageRoles.php";
  //   //const url = "../api/manageRoles.php";
  //   const formData = new FormData();
  //   formData.append("action", "remove");
  //   formData.append("user_id", user_id);

  //   try {
  //     const response = await axios.post(url, formData);
  //     return response.data === "success";
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  // const deleteRole = async (roleList) => {
  //   const url = "http://localhost/unmg_pms/api/manageRoles.php";
  //   //const url = "../api/manageRoles.php";
  //   const formData = new FormData();
  //   formData.append("action", "delete");
  //   formData.append("roles", JSON.stringify(roleList));

  //   try {
  //     const response = await axios.post(url, formData);
  //     return response.data === "success";
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const uploadProfilePicture = async (file) => {
    const imageURL = `../src/assets/images/profile_${JSON.parse(localStorage.getItem("user")).employee_id
      }_${format(new Date(), "T")}.${file.name.split(".")[file.name.split(".").length - 1]
      }`;

    const formdata = new FormData();
    formdata.append("imageFile", file);
    formdata.append(
      "user_id",
      JSON.parse(localStorage.getItem("user")).users_id
    );
    formdata.append("imageURL", imageURL);
    try {
      const response = await axios.post(url.uploadProfilePicture, formdata);
      if (response.data) {
        const tempUser = JSON.parse(localStorage.getItem("user"));
        tempUser.picture = ".." + imageURL.substring(6);
        localStorage.setItem("user", JSON.stringify(tempUser));
        return 1;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const uploadUsers = async (data) => {
    try {
      const fd = new FormData();
      fd.append("employees", data);

      const response = await axios.post(url.uploadBatchUsers, fd);
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(localStorage.getItem("currentUser"));
    }
    axios
      .get(url.conglomerate, {
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
      try {
        const response = await axios.get(url.retrieveUsers, {
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
        const response = await axios.get(url.retrieveUsers, {
          params: {
            usertype: true,
          },
        });
        setUsertypeList(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    const retrieveKPIYear = async () => {
      try {
        const response = await axios.get(url.fetchKPIDuration, {
          params: {
            kpiDuration: true,
          },
        });
        setKpiDurations(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    //nobrin dagdag
    const getVerifyIfEvaluator = async () => {
      try {
        const current_user = localStorage.getItem("currentUser");
        if (!current_user) return;
        if (JSON.parse(current_user).employee_id) {
          const response = await axios.get(url.retriveVerifyIfEvaluator, {
            params: {
              verifyIfEvaluator: true,
              employee_id: JSON.parse(current_user).employee_id,
            },
          });

          // Check if response data exists and meets your criteria for having evaluators
          const hasEvaluators = !!response.data && response.data.length > 0;

          // Update state or perform actions based on the presence of evaluators
          setVerifyIfEvaluator(hasEvaluators);
        } else {
          // Handle the case when currentUser or its properties are undefined
          console.error('currentUser or employee_id is undefined.');
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    const getGlobalSettings = async () => {
      try {
        const response = await axios.get(url.retrieveGlobalSettings, {
          params: {
            globalSettings: true,
          },
        });
        const settings = response.data.reduce((accumulator, setting) => {
          return {
            ...accumulator,
            pillar_min: parseInt(setting.pillar_min, 10) || 0,
            pillar_max: parseInt(setting.pillar_max, 10) || 0,
            required_min: parseInt(setting.required_min, 10) || 0,
            required_max: parseInt(setting.required_max, 10) || 0,
            overall_percentage: parseInt(setting.overall_percentage, 10) || 0,
            goal_status: parseInt(setting.goal_status, 10) || 0,
          };
        }, {});
        setGlobalSettings(settings);
      } catch (e) {
        console.log(e.message);
      }
    };
    getVerifyIfEvaluator();
    retrieveKPIYear();
    fetchHeads();
    retrieveUserTypes();
    getGlobalSettings();
  }, [currentUser]);

  const value = {
    departmentList,
    usertypeList,
    kpiDurations,
    currentUser,
    companyList,
    headList,
    verifyIfEvaluator,
    globalSettings,
    nav,
    navigate,
    manageUser,
    signInUser,
    addCompany,
    uploadUsers,
    updateUser,
    fetchUsers,
    //deleteRole,
    registerUser,
    //registerRole,
    //unassignUser,
    addDepartment,
    //updateUserRole,
    getDepartments,
    setCurrentUser,
    getBusinessUnits,
    deleteDepartment,
    uploadProfilePicture,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
