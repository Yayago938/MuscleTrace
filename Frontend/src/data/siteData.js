export const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "Workouts", path: "/workout", icon: "fitness_center" },
  { label: "Community", path: "/community", icon: "groups" },
  { label: "Analytics", path: "/analytics", icon: "insights" },
];

export const topLinks = [
  { label: "Training", path: "/workout" },
  { label: "Anatomy", path: "/analytics" },
  { label: "Progress", path: "/dashboard" },
];

export const footerLinks = ["Privacy Policy", "Terms of Service", "Scientific Method"];

export const landingFeatures = [
  {
    title: "Anatomic Heatmaps",
    body: "Our 3D engine visualizes fatigue and activation in real time so you can see which fibers are carrying the work.",
    icon: "query_stats",
    tone: "light",
  },
  {
    title: "Intelligent Tracking",
    body: "The training log adapts to tempo, volume, and readiness without collapsing into spreadsheet thinking.",
    icon: "fitness_center",
    tone: "accent",
  },
  {
    title: "Biometric Fusion",
    body: "Blend wearables, readiness, and recovery markers into a single editorial view of performance.",
    icon: "monitor_heart",
    tone: "neutral",
  },
];

export const sessions = [
  { title: "Hypertrophy: Lower Body", date: "24 OCT", type: "Strength", progress: 85, meta: "62 min • 14,200kg volume" },
  { title: "Anatomical Mobility", date: "22 OCT", type: "Recovery", progress: 100, meta: "45 min • Full body focus" },
  { title: "Power Projection", date: "21 OCT", type: "Peak", progress: 92, meta: "30 min • High intensity" },
];

export const weeklyLoad = [40, 60, 85, 55, 100, 70, 45];

export const analyticsMetrics = [
  { label: "Velocity", value: "0.82", unit: "m/s", tone: "text-primary", note: "Dynamic Strength Zone", icon: "speed" },
  { label: "Metabolic Heat", value: "101.4", unit: "°F", tone: "text-secondary", note: "Elevated Baseline", icon: "thermostat" },
  { label: "Time Under Tension", value: "42:18", unit: "min", tone: "text-on-surface", note: "Session Cumulative", icon: "timer" },
];

export const leaderboardPeople = [
  { rank: "01", name: "Marcus Aurelius", streak: "42 Day Streak", score: "124.5 Tons", active: false },
  { rank: "14", name: "You (Sarah J.)", streak: "12 Day Streak", score: "88.2 Tons", active: true },
  { rank: "03", name: "Leo DaVinci", streak: "30 Day Streak", score: "118.0 Tons", active: false },
  { rank: "04", name: "Elena Rossi", streak: "15 Day Streak", score: "102.4 Tons", active: false },
];

export const activityFeed = [
  "Marcus A. crushed a Chest Sculpture workout.",
  "Elena R. achieved 100 Day Streak status!",
  "Leo D. shared a new Leg Day Masterpiece.",
];

export const defaultWorkout = [
  { id: 1, set: 1, weight: 80, reps: 8, rpe: "8.5", done: true },
  { id: 2, set: 2, weight: "", reps: "", rpe: "-", done: false },
];
