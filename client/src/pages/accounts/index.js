import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import PasswordChange from "./PasswordChange";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/logout"} element={<Logout />} />
      <Route path={"/password_change"} element={<PasswordChange />} />
    </Routes>
  );
}
