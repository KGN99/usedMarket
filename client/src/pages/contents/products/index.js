import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductCreate from "./ProductCreate";
import ProductDetail from "./ProductDetail";
import ProductUpdateData from "./ProductUpdateData";
import ProductCategory from "./ProductCategory";
import ProductSearch from "./ProductSearch";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route path={"/create"} element={<ProductCreate />} />
      <Route path={"/:id"} element={<ProductDetail />} />
      <Route path={"/:id/update"} element={<ProductUpdateData />} />
      <Route path={"/category"} element={<ProductCategory />} />
      <Route path={"/search"} element={<ProductSearch />} />
    </Routes>
  );
}
