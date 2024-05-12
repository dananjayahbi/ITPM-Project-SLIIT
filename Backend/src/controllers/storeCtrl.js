const Item = require('../models/store.model');
const path = require('path');
const multer = require("multer");
const fs = require('fs');




const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, '../frontend/public/images');
    },
    filename: (req, file, callback) => {
      const filename = `${Date.now()}-${file.originalname}`;
      callback(null, filename);
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      const extname = path.extname(file.originalname);
      if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png') {
        return callback(new Error('Only JPG, JPEG, and PNG files are allowed'));
      }
      callback(null, true);
    }
  });
  
  const validateFileUpload = (req, res, next) => {
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file' });
    }
    next();
  };
  
  const createItem = async (req, res) => {
    try {
      // Ensure that multer has parsed the file and attached it to req.file
      if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file', success: false });
      }
  
      const itemId = req.body.itemId;
      const findItem = await Item.findOne({ itemId: itemId });
      if (!findItem) {
        const newItem = await Item.create({
          itemId: req.body.itemId,
          itemName: req.body.itemName,
          companyName: req.body.companyName,
          itemAmount: req.body.itemAmount,
          itemDescription: req.body.itemDescription,
          itemImage: req.file.filename // Use multer-generated filename
        });
        
        res.status(201).json({
          newItem,
          success: true,
          msg: 'Item Is Added Successfully!'
        });
      } else {
        res.json({ msg: 'Item is already Added', success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error for Adding an Item', success: false });
    }
  };
  
  

const getAllItems =async(req,res)=>{
    try {
        const AllItem = await Item.find();
        res.json(AllItem)
    } catch (error) {
        res.status(400).json(error)
    }
}
const getAItem = async(req,res)=>{
    let itemId = req.params.id;
    const user = await Item.findById(itemId)
    .then((item)=>{
        res.json(item);
    }).catch(()=>{
       
        res.status(500).send({status:"Error"});
    })
}

const updateItem = async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const updateItem = await Item.findByIdAndUpdate(
            id,
            {
                itemId:req?.body?.itemId,
                itemName:req?.body?.itemName,
                companyName:req?.body?.companyName,
                itemAmount:req?.body?.itemAmount,
                itemDescription:req?.body?.itemDescription,
                itemImage:req?.body?.itemImage,
            },
            {
                new:true,
            }
        );
        res.json(updateItem)
    }catch(error){
         res.status(404).json(error)
    }
}

//Delete A Item
const deleteItem = async(req,res) =>{
    const {id} = req.params;
    try{
      const deleteItem = await Item.findByIdAndDelete(id);
      res.json({msg:'Item Deleted Successfully!',deleteItem});
    }catch(error){
        res.status(402).json(error);
    }
}  



module.exports ={upload,validateFileUpload,createItem,getAllItems,getAItem,updateItem,deleteItem};