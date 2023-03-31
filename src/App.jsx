import React from "react";
import "./css/root.css";
import { Navbar } from "./components";
function App() {
  return (
    <>
      <Navbar
        notification_count={0}
        user_data={{
          first_name: "Kyle",
        }}
      />
    </>
  );
}

export default App;
