import { Outlet } from "react-router";
import Nav from "../../components/Nav";
import { useState } from "react";
const LayoutClient = () => {

  return (
    <div>
      <Nav />
      {<Outlet />}
    </div>
  );
};

export default LayoutClient;
