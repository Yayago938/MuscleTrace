const authmiddleware = require ('../middlewares/authmiddleware');

const express=require('express')
const {createworkout,getWorkouts,getWorkoutById,updateWorkout,deleteWorkout}=require('../controllers/workoutcontroller')
const router=express.Router();

router.post('/',authmiddleware, createworkout);
router.get('/',authmiddleware, getWorkouts);
router.get('/:id',authmiddleware, getWorkoutById);
// router.put('/:id',authmiddleware, updateWorkout);
router.delete('/:id',authmiddleware, deleteWorkout);
module.exports = router;