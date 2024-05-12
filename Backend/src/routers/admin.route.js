const express = require("express");
const {
  createAdmin,
  getAllAdmin
} = require("../controllers/adminCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createAdmin);
router.get("/all", getAllAdmin);

module.exports = router;
