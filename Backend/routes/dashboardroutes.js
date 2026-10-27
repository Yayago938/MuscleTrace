const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { getDashboard } = require("../controllers/dashboardcontroller");

const router = express.Router();
router.get("/", authmiddleware, getDashboard);
module.exports = router;
