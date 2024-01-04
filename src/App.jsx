import React, { useEffect } from "react";
import "./css/root.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { AuthProvider } from "./context/authContext";
import { FunctionProvider } from "./context/FunctionContext";
function App() {
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      const url = "../../public/logo_white.png";
      //const url = "./../logo_white.png"
      document.head.querySelector("link").href = url;
    }
  }, []);
  useEffect(() => {
    if (!window.location.pathname.includes("profile/")) {
      if (localStorage.getItem("user")) localStorage.removeItem("user");
    }
  }, [window.location]);
  return (
    <Router>
      <FunctionProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <span className="fixed bottom-0 left-2 z-[20] bg-default-dark px-2 py-1 text-[0.7rem]">PMS Version 1.0.0</span>
        </AuthProvider>
      </FunctionProvider>
    </Router>
  );
}

export default App;
