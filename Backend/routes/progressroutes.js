const express=require('express');
const router=express.Router();
const {  getNormalizedVolume,getSmartMuscleDistribution,getWeeklyBreakdown,getEnhancedHistory } = require('../controllers/progresscontroller');
const authmiddleware = require ('../middlewares/authmiddleware');

router.get("/volume", authmiddleware, getNormalizedVolume)
router.get("/muscles", authmiddleware, getSmartMuscleDistribution)
router.get("/history", authmiddleware, getEnhancedHistory)
router.get("/weekly", authmiddleware, getWeeklyBreakdown)

module.exports = router;