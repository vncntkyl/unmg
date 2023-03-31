import React from "react";
import "./css/root.css";
import {Sidebar, Navbar} from "./components/";
export default function App() {
  return (
    <>
    <Navbar notification={5}/>
    <Sidebar />
    </>
  );
}
