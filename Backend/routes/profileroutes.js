const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { getProfile, updateProfile } = require("../controllers/profilecontroller");

const router = express.Router();

router.get("/", authmiddleware, getProfile);
router.put("/", authmiddleware, updateProfile);

module.exports = router;
