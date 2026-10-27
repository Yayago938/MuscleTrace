const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { addFriend, getFriends, removeFriend } = require("../controllers/friendscontroller");

const router = express.Router();
router.get("/", authmiddleware, getFriends);
router.post("/:id", authmiddleware, addFriend);
router.delete("/:id", authmiddleware, removeFriend);
module.exports = router;
