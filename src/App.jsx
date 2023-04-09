import React from "react";
import "./css/root.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { AuthProvider } from "./context/authContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
