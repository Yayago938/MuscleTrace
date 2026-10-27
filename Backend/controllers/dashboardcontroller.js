const prisma = require("../utils/prisma");

async function getDashboard(req, res) {
  try {
    const [recentWorkouts, friendActivity] = await Promise.all([
      prisma.workoutSession.findMany({
        where: { userId: req.userId, status: "COMPLETED" },
        select: { id: true, completedAt: true, duration: true, workout: { select: { id: true, name: true } }, _count: { select: { exercises: true } } },
        orderBy: [{ completedAt: "desc" }, { id: "desc" }],
        take: 5,
      }),
      prisma.workoutSession.findMany({
        where: { status: "COMPLETED", user: { friendOf: { some: { userId: req.userId } } } },
        select: { id: true, completedAt: true, duration: true, workout: { select: { id: true, name: true } }, _count: { select: { exercises: true } }, user: { select: { name: true } } },
        orderBy: [{ completedAt: "desc" }, { id: "desc" }],
        take: 10,
      }),
    ]);
    const format = ({ workout, completedAt, duration, _count, ...rest }) => ({ ...rest, workoutId: workout.id, name: workout.name, date: completedAt, duration, exerciseCount: _count.exercises });
    res.json({ recentWorkouts: recentWorkouts.map(format), friendActivity: friendActivity.map(({ user, ...session }) => ({ ...format(session), friendName: user.name || "Friend" })) });
  } catch {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
}

module.exports = { getDashboard };
