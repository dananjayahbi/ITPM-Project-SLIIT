const express = require("express");
const {
  createCompany,
  getAllCompanies,
  updateCompany,
  getACompany,
  deleteCompany,
} = require("../controllers/companyCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createCompany);
router.get("/all", getAllCompanies);
router.put("/:id", updateCompany);
router.get("/:id", getACompany);
router.delete("/:id", deleteCompany);

module.exports = router;
