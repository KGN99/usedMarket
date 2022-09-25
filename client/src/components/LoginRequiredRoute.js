import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function LoginRequiredRoute() {
  const { authenticated } = useSelector((state) => state.token);
  const location = useLocation();
  if (authenticated) {
    return <Outlet />;
  } else {
    return <Navigate replace to="/accounts/login" state={{ from: location }} />;
  }
}
