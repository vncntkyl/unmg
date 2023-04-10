import React from "react";
import "./css/root.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { AuthProvider } from "./context/authContext";
import { FunctionProvider } from "./context/FunctionContext";
function App() {
  return (
    <Router>
      <FunctionProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </FunctionProvider>
    </Router>
  );
}

export default App;
