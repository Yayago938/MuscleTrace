import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import LogWorkout from './pages/LogWorkout'
import Community from './pages/Community'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/workouts" element={<LogWorkout />} />
      <Route path="/community" element={<Community />} />
      {/* Fallback routes for sidebar links */}
      <Route path="/profile" element={<Dashboard />} />
    </Routes>
  )
}

export default App
