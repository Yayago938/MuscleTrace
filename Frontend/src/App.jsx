import { Navigate, Route, Routes } from "react-router-dom";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { CommunityPage } from "./pages/CommunityPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { WorkoutPage } from "./pages/WorkoutPage";

export default function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<AnalyticsPage />} path="/analytics" />
      <Route element={<CommunityPage />} path="/community" />
      <Route element={<WorkoutPage />} path="/workout" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}
