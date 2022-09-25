import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import AccountsRoutes from "./accounts";
import ContentsRoutes from "./contents";
import LoginRequiredRoute from "components/LoginRequiredRoute";
import NotFound from "components/NotFound";
import Home from "./Home";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route element={<LoginRequiredRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/contents/*" element={<ContentsRoutes />} />
          </Route>
          <Route path="/accounts/*" element={<AccountsRoutes />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
