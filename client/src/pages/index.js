import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
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
