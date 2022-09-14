import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductCreate from "./ProductCreate";
import ProductDetail from "./ProductDetail";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/create"} element={<ProductCreate />} />
      <Route path={"/:id"} element={<ProductDetail />} />
    </Routes>
  );
}
