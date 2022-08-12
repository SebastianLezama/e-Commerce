import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="App">
      <NavBar isInHeader={true} />
      <div className="main">
        <Outlet />
      </div>
      <NavBar isInHeader={false} />
    </div>
  );
};

export default Layout;
