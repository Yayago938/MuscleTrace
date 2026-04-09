const prisma=require("../utils/prisma");
 const createworkout= async(req,res)=>{
    try{
        const workout=await prisma.workout.create({
            data:{
                userId:req.userId
            }
        }
        )
         res.status(201).json(workout)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

 const getWorkouts = async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.userId },
      include: { exercises: true },
      orderBy: { date: "desc" }
    })

    res.json(workouts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" })
  }
}
 const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params

    const workout = await prisma.workout.findUnique({
      where: { id },
      include: { exercises: true }
    })

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" })
    }

    // 🔐 Authorization check
    if (workout.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    res.json(workout)
  } catch (error) {
    res.status(500).json({ error: "Error fetching workout" })
  }
}

 const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params

    const workout = await prisma.workout.findUnique({
      where: { id }
    })

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" })
    }

    if (workout.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    await prisma.workout.delete({
      where: { id }
    })

    res.json({ message: "Workout deleted" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting workout" })
  }
}



module.exports={createworkout,getWorkouts,getWorkoutById,deleteWorkout}