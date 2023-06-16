import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/unmg_logo_colored.png";
import logo_2 from "../assets/unmg_logo_plain_colored.png";
import Alert from "../misc/Alert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import classNames from "classnames";

export default function Login() {
  const navigate = useNavigate();
  const [error, showError] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const { signInUser,setCurrentUser } = useAuth();
  const username = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus("submitting");
    const loginResponse = await signInUser(
      username.current.value,
      password.current.value
    );
    if (typeof loginResponse === "object") {
      setCurrentUser(JSON.stringify(loginResponse));
      sessionStorage.setItem("currentUser", JSON.stringify(loginResponse));
      if (sessionStorage.getItem("redirect_to")) {
        const redirectLink = sessionStorage.getItem("redirect_to");
        sessionStorage.removeItem("redirect_to");
        navigate(redirectLink);
      } else {
        navigate("/");
      }
    } else {
      showError(loginResponse);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center drop-shadow-lg p-4">
        <div className="overflow-hidden rounded-lg transition-all w-[90%] md:w-[50%] lg:w-[80%] xl:w-[50%] flex flex-col lg:flex-row">
          <div className="bg-white flex flex-row gap-2 justify-center items-center p-4 lg:w-1/2 lg:h-[500px]">
            <img
              src={logo_2}
              alt="logo"
              className="w-auto h-[3rem] lg:hidden"
            />
            <span className="text-[.8rem] text-un-blue font-semibold lg:hidden">
              United Neon Media Group
              <br />
              Performance Management System
            </span>
            <img
              src={logo}
              alt="logo"
              className="hidden w-auto h-[15rem] lg:block"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-un-blue flex flex-col justify-center items-center p-8 gap-6 lg:w-1/2"
          >
            <span className="text-white text-[1.5rem] pb-3">Sign In</span>
            <input
              className="bg-transparent placeholder:text-[#d6d6d6]  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
              type="text"
              placeholder="Username or Email Address"
              ref={username}
            />
            <input
              className="bg-transparent placeholder:text-[#d6d6d6]  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
              type="password"
              placeholder="Password"
              ref={password}
            />
            <button
              type="submit"
              className={classNames(
                "bg-un-red hover:bg-un-red-dark text-white p-2 w-[80%] rounded flex items-center justify-center",
                loginStatus === "submitting" &&
                  "bg-mid-gray pointer-events-none"
              )}
            >
              {loginStatus === null ? (
                "Sign In"
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin text-[1.1rem]" />
              )}
            </button>
          </form>
        </div>
        {error && (
          <>
            <Alert
              type="warning"
              title={"Login Error"}
              message={error}
              onClose={() => {
                showError(null);
                setLoginStatus(null);
              }}
            />
            <div
              className="bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto"
              onClick={() => {
                showError(null);
                setLoginStatus(null);
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
