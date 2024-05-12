const express = require("express");
const {
  createSeller,
  getAllSellars,
  GetaSellar,
  updateSeller,
  deleteSeller,
} = require("../controllers/sellarCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createSeller);
router.get("/all", getAllSellars);
router.get("/:id", GetaSellar);
router.put("/:id", authMiddleware, updateSeller);
router.delete("/:id", authMiddleware, deleteSeller);

module.exports = router;
