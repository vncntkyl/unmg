import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/unmg_logo_colored.png";
import logo_2 from "../assets/unmg_logo_plain_colored.png";

export default function Login() {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const username = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInUser(username.current.value, password.current.value);
  };

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center drop-shadow-lg p-4">
        <div className="overflow-hidden rounded-lg transition-all w-[90%] md:w-[50%] flex flex-col lg:flex-row">
          <div className="bg-white flex flex-row gap-2 justify-center items-center p-4 lg:w-1/2 lg:h-[500px]">
            <img src={logo_2} alt="logo" className="w-auto h-[3rem] lg:hidden" />
            <span className="text-[.8rem] text-un-blue font-semibold lg:hidden">
              United Neon Media Group
              <br />
              Performance Management System
            </span>
            <img src={logo} alt="logo" className="hidden w-auto h-[15rem] lg:block" />
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="bg-un-blue flex flex-col justify-center items-center p-8 gap-6 lg:w-1/2"
          >
            <span className="text-white text-[1.5rem] pb-3">Sign In</span>
            <input
              className="bg-transparent placeholder:text-[#d6d6d6]  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
              type="text"
              placeholder="Username"
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
              className="bg-un-red text-white p-2 w-[80%] rounded"
            >
              Sign In
            </button>
          </form>
        </div>
        {/* <form onSubmit={handleSubmit} className="bg-un-blue w-[25%] h-[60%] rounded-r-lg flex flex-col justify-center items-center p-8 gap-6">
          <span className="text-white text-[30px] pb-3">Sign In</span>
          <input
            className="bg-transparent placeholder:text-white  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
            type="text"
            placeholder="Username"
            ref={username}
          />
          <input
            className="bg-transparent placeholder:text-white  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
            type="password"
            placeholder="Password"
            ref={password}
          />
          <button
            type="submit"
            className="bg-un-red text-white p-2 w-[80%] rounded"
          >
            Sign In
          </button>
        </form> */}
        
      </div>
    </>
  );
}
