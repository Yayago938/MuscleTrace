import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { CommunityPage } from "../pages/CommunityPage";
import { Dashboard } from "../pages/Dashboard";
import EditWorkout from "../pages/EditWorkout";
import ExerciseDetail from "../pages/ExerciseDetail";
import ExerciseLibrary from "../pages/ExerciseLibrary";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import SavedWorkouts from "../pages/SavedWorkouts";
import { SignupPage } from "../pages/SignupPage";
import { WorkoutPage } from "../pages/WorkoutPage";
import { ProtectedRoute, PublicOnlyRoute } from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />

      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<ExerciseLibrary />} path="/exercises" />
          <Route element={<ExerciseDetail />} path="/exercises/:exerciseId" />
          <Route element={<SavedWorkouts />} path="/workouts" />
          <Route element={<WorkoutPage />} path="/workouts/new" />
          <Route element={<EditWorkout />} path="/workouts/:workoutId" />
          <Route element={<AnalyticsPage />} path="/history" />
          <Route element={<AnalyticsPage />} path="/history/:historyId" />
          <Route element={<CommunityPage />} path="/friends" />
          <Route element={<CommunityPage />} path="/friends/:userId" />
          <Route element={<Dashboard />} path="/profile" />
          <Route element={<Dashboard />} path="/profile/edit" />
          <Route element={<Dashboard />} path="/notifications" />
          <Route element={<Dashboard />} path="/settings" />
        </Route>
      </Route>

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
