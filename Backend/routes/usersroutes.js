const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { searchUsers } = require("../controllers/friendscontroller");

const router = express.Router();
router.get("/search", authmiddleware, searchUsers);
module.exports = router;
