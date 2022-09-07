import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import PasswordChange from "./PasswordChange";
import ProfileUpdate from "./ProfileUpdate";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/logout"} element={<Logout />} />
      <Route path={"/profile/:id"} element={<Profile />} />
      <Route path={"/profile/:id/update"} element={<ProfileUpdate />} />
      <Route path={"/password_change"} element={<PasswordChange />} />
    </Routes>
  );
}
