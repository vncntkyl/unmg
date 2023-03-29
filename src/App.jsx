import React from "react";
import "./css/root.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
    <Navbar notification={5}/>
    <Sidebar/>
    </>
  );
}

export default App;
