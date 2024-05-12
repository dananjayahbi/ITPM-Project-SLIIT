const express = require('express');
const { upload,validateFileUpload,createItem, getAllItems, getAItem, updateItem, deleteItem,} = require('../controllers/storeCtrl');
const router = express.Router();

router.post("/create", upload.single('itemImage'), validateFileUpload, createItem);
router.get("/getall", getAllItems);
router.get("/get/:id", getAItem);
router.put("/update/:id", updateItem);
router.delete("/deleteitem/:id", deleteItem);

module.exports = router;
