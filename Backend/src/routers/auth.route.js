const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

//Login An User
router.post("/login", loginUser);

module.exports = router;