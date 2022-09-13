import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsRoutes from "./products";

export default function ContentsRoutes() {
  return (
    <Routes>
      <Route path={"/products/*"} element={<ProductsRoutes />} />
    </Routes>
  );
}
