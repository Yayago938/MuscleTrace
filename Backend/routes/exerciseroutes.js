const authmiddleware = require ('../middlewares/authmiddleware');

const express = require('express');
const { addExercise, updateExercise, deleteExercise } = require('../controllers/exercisecontroller');
const router = express.Router();    
router.post('/',authmiddleware, addExercise);
router.put('/:id',authmiddleware, updateExercise);
router.delete('/:id',authmiddleware, deleteExercise);
module.exports = router;