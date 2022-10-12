import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<App />} />
    </Routes>
  );
}
