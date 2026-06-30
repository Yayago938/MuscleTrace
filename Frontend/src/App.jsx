import { Navigate, Route, Routes } from "react-router-dom";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { CommunityPage } from "./pages/CommunityPage";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { WorkoutPage } from "./pages/WorkoutPage";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import ExerciseDetail from "./pages/ExerciseDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<ExerciseLibrary />} path="/explorer" />
      <Route element={<ExerciseDetail />} path="/explorer/:exerciseId"/>
      <Route element={<CommunityPage />} path="/community" />
      <Route element={<WorkoutPage />} path="/workout" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}
