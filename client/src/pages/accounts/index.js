import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import PasswordChange from "./PasswordChange";
import ProfileUpdate from "./ProfileUpdate";
import NotFound from "components/NotFound";
import LoginRequiredRoute from "components/LoginRequiredRoute";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/logout"} element={<Logout />} />
      <Route element={<LoginRequiredRoute />}>
        <Route path={"/:id"} element={<Profile />} />
        <Route path={"/:id/update"} element={<ProfileUpdate />} />
        <Route path={"/password_change"} element={<PasswordChange />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
