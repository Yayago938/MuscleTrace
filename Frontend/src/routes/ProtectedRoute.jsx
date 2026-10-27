import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getProfile } from "../api/profileService";

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

export function ProfileCompleteRoute() {
  const [status, setStatus] = useState("loading");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    getProfile()
      .then(({ data }) => active && setStatus(data.profileCompleted ? "complete" : "incomplete"))
      .catch(() => active && setStatus("error"));

    return () => { active = false; };
  }, [retryKey]);

  if (status === "loading") return <main className="p-8 text-on-surface-variant">Loading profile...</main>;
  if (status === "incomplete") return <Navigate replace to="/profile-setup" />;
  if (status === "error") return <main className="p-8 text-secondary">Unable to check your profile. <button className="ml-2 font-semibold underline" onClick={() => { setStatus("loading"); setRetryKey((key) => key + 1); }} type="button">Retry</button></main>;

  return <Outlet />;
}
