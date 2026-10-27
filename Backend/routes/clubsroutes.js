const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createClub, listClubs, myClubs, joinClub, leaveClub } = require("../controllers/clubscontroller");

const router = express.Router();
router.post("/", authmiddleware, createClub);
router.get("/", authmiddleware, listClubs);
router.get("/mine", authmiddleware, myClubs);
router.post("/:id/join", authmiddleware, joinClub);
router.post("/:id/leave", authmiddleware, leaveClub);
module.exports = router;
