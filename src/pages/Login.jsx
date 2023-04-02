import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const { currentUser, signInUser } = useAuth();
  const username = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInUser(username.current.value, password.current.value);
  };

  useEffect(() => {
    if (sessionStorage.getItem('currentUser')) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-full max-w-sm bg-white rounded-lg shadow-md p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="username"
              ref={username}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              ref={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
