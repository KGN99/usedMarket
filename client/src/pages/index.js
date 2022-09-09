import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import AccountsRoutes from "./accounts";
import ContentsRoutes from "./contents";
import Home from "./Home";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/accounts/*" element={<AccountsRoutes />} />
          <Route path="/contents/*" element={<ContentsRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
