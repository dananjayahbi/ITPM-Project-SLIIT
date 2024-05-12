const express = require("express");
const {createBin,getAllBins,getBin,updateBin,deleteBin} = require('../controllers/binCtrl')
// const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create",createBin);
router.get("/getall",getAllBins);
router.get("/getbin/:id",getBin);
router.put("/updatebin/:id",updateBin);
router.delete("/deletebin/:id",deleteBin);


module.exports =router; 