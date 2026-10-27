const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { addFriend, getFriends, getFriendProfile, removeFriend } = require("../controllers/friendscontroller");

const router = express.Router();
router.get("/", authmiddleware, getFriends);
router.get("/:id/profile", authmiddleware, getFriendProfile);
router.post("/:id", authmiddleware, addFriend);
router.delete("/:id", authmiddleware, removeFriend);
module.exports = router;
