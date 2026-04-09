const prisma=require("../utils/prisma");
const muscleFactors=require("../utils/musclefactors");

 const getNormalizedVolume = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        workout: {
          userId: req.userId
        }
      },
      include: {
        workout: true
      }
    })

    let totalVolume = 0
    let totalNormalizedVolume = 0

    exercises.forEach((ex) => {
      const rawVolume = ex.sets * ex.reps * ex.weight
      const factor = muscleFactors[ex.muscleGroup] || 1

      const normalized = rawVolume * factor

      totalVolume += rawVolume
      totalNormalizedVolume += normalized
    })

    res.json({
      rawVolume: totalVolume,
      normalizedVolume: totalNormalizedVolume
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate volume" })
  }
}

 const getSmartMuscleDistribution = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        workout: {
          userId: req.userId
        }
      }
    })

    const muscleData = {}
    let total = 0

    exercises.forEach((ex) => {
      const rawVolume = ex.sets * ex.reps * ex.weight
      const factor = muscleFactors[ex.muscleGroup] || 1
      const normalized = rawVolume * factor

      if (!muscleData[ex.muscleGroup]) {
        muscleData[ex.muscleGroup] = 0
      }

      muscleData[ex.muscleGroup] += normalized
      total += normalized
    })

    // 🔥 Convert to percentages (IMPORTANT for 3D UI)
    Object.keys(muscleData).forEach((key) => {
      muscleData[key] = ((muscleData[key] / total) * 100).toFixed(2)
    })

    res.json(muscleData)
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate muscle distribution" })
  }
}

 const getEnhancedHistory = async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.userId },
      include: { exercises: true },
      orderBy: { date: "asc" }
    })

    const history = workouts.map((workout) => {
      let raw = 0
      let normalized = 0

      workout.exercises.forEach((ex) => {
        const rawVolume = ex.sets * ex.reps * ex.weight
        const factor = muscleFactors[ex.muscleGroup] || 1

        raw += rawVolume
        normalized += rawVolume * factor
      })

      return {
        date: workout.date,
        rawVolume: raw,
        normalizedVolume: normalized
      }
    })

    res.json(history)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" })
  }
}


 const getWeeklyBreakdown = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        workout: {
          userId: req.userId
        }
      },
      include: {
        workout: true
      }
    })

    const weeklyData = {}

    exercises.forEach((ex) => {
      const rawVolume = ex.sets * ex.reps * ex.weight
      const factor = muscleFactors[ex.muscleGroup] || 1
      const normalized = rawVolume * factor

      const date = new Date(ex.workout.date)

      // 🧠 Convert date → ISO week
      const weekKey = getWeekKey(date)

      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = 0
      }

      weeklyData[weekKey] += normalized
    })

    // Convert object → array
    const result = Object.entries(weeklyData).map(([week, volume]) => ({
      week,
      volume: Number(volume.toFixed(2))
    }))

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate weekly breakdown" })
  }
}

function getWeekKey(date) {
  const temp = new Date(date)

  // Set to nearest Thursday (ISO week rule)
  temp.setDate(temp.getDate() + 4 - (temp.getDay() || 7))

  const yearStart = new Date(temp.getFullYear(), 0, 1)

  const weekNo = Math.ceil(
    ((temp - yearStart) / 86400000 + 1) / 7
  )

  return `${temp.getFullYear()}-W${weekNo}`
}

module.exports={getNormalizedVolume,getSmartMuscleDistribution,getEnhancedHistory,getWeeklyBreakdown}