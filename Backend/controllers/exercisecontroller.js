const prisma=require("../utils/prisma");

const addExercise = async (req, res) => {
  try {
    const {
      workoutId,
      name,
      sets,
      reps,
      weight,
      muscleGroup,
      muscleName
    } = req.body

    const workout = await prisma.workout.findUnique({
      where: { id: workoutId }
    })

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" })
    }

    if (workout.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const exercise = await prisma.exercise.create({
      data: {
        workoutId,
        name,
        sets,
        reps,
        weight,
        muscleGroup,
        muscleName
      }
    })

    res.status(201).json(exercise)
  } catch (error) {
    res.status(500).json({ error: "Failed to add exercise" })
  }
}

 const updateExercise = async (req, res) => {
  try {
    const { id } = req.params

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: { workout: true }
    })

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" })
    }

    if (exercise.workout.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const updated = await prisma.exercise.update({
      where: { id },
      data: req.body
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: "Failed to update exercise" })
  }
}

 const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: { workout: true }
    })

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" })
    }

    if (exercise.workout.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    await prisma.exercise.delete({
      where: { id }
    })

    res.json({ message: "Exercise deleted" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete exercise" })
  }
}
module.exports={addExercise,updateExercise,deleteExercise}