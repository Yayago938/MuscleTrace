import { Navigate, Outlet, useLocation } from "react-router-dom";

function hasAuthToken() {
  return Boolean(localStorage.getItem("token"));
}

export function ProtectedRoute() {
  const location = useLocation();

  if (!hasAuthToken()) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  if (hasAuthToken()) {
    return <Navigate replace to="/dashboard" />;
  }

  return <Outlet />;
}
