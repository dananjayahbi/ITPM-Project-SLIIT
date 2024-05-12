const express = require('express');
const {deleteRejectedBinRequest,viewRejectedBinRequests,createRejectedbinRequest,createbinRequest,getAllBinRequests,getABinRequest,updateBinRequest,createAcceptedbinRequest,deletebinRequest,deleteBinRequest,viewBinRequests,viewBinRequest} = require('../controllers/binRequestCtrl');
const router = express.Router();

router.post("/create", createbinRequest);
router.get("/getall", getAllBinRequests);
router.get("/get/:id", getABinRequest);
router.put("/update/:id", updateBinRequest);
router.delete("/delete/:id", deletebinRequest);
router.post("/acceptedbin/:id",createAcceptedbinRequest);
router.post("/rejectedbin/:id",createRejectedbinRequest);
router.get("/getbin",viewBinRequests);
router.get("/getRejectedbin",viewRejectedBinRequests);
router.get("/getbin/:id",viewBinRequest);
router.delete("/deletebin/:id",deleteBinRequest);
router.delete("/deleteRejectedbin/:id",deleteRejectedBinRequest);





module.exports = router;
