const express = require("express");
const authUsers = require("../middlewares/authUsers");
const { registerUser, getUsers } = require("../controllers/users");
const router = express.Router();

router.post("/login", authUsers);
router.post("/register",registerUser);
router.get("/users",getUsers);
module.exports = router;

