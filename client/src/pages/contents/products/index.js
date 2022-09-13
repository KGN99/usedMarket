import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductCreate from "./ProductCreate";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/create"} element={<ProductCreate />} />
    </Routes>
  );
}
