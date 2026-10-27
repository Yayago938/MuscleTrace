const prisma = require("../utils/prisma");

async function getDashboard(req, res) {
  try {
    const [recentWorkouts, friendActivity] = await Promise.all([
      prisma.workout.findMany({
        where: { userId: req.userId },
        select: { id: true, name: true, date: true, createdAt: true },
        orderBy: [{ date: "desc" }, { id: "desc" }],
        take: 5,
      }),
      prisma.workout.findMany({
        where: { user: { friendOf: { some: { userId: req.userId } } } },
        select: { id: true, name: true, date: true, createdAt: true, user: { select: { name: true } } },
        orderBy: [{ date: "desc" }, { id: "desc" }],
        take: 10,
      }),
    ]);
    res.json({ recentWorkouts, friendActivity: friendActivity.map(({ user, ...workout }) => ({ ...workout, friendName: user.name || "Friend" })) });
  } catch {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
}

module.exports = { getDashboard };
