import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/signup"} element={<Signup />} />
    </Routes>
  );
}
