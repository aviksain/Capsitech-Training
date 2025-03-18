import React from "react";
import { Outlet } from "react-router-dom";
import { TodoProvider } from "./Context/TodoContext";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
