import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import AccountsRoutes from "./accounts";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/accounts/*" element={<AccountsRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
