const Item = require('../models/binRequest.model');
const AcceptedBinRerquest = require('../models/acceptedBinRequest.model');
const RejectedBinRerquest = require('../models/rejectedBinRequest.model');
const path = require('path');
const fs = require('fs');




const createbinRequest = async(req,res)=>{
    const userId = req.body.userId;
    const binRequestCompany = req.body.binRequestCompany;
    const binRequestAddress = req.body.binRequestAddress;
    const binRequestLocation = req.body.binRequestLocation;
    const binRequestType = req.body.binRequestType;
    const binRequestDate = req.body.binRequestDate;
    const binRequestDescription = req.body.binRequestDescription;
 

    const binRequestApply = new Item({
        userId,
        binRequestCompany,
        binRequestAddress,
        binRequestLocation,
        binRequestType,
        binRequestDate,
        binRequestDescription,

     
    })

    binRequestApply.save().then(()=>{
        res.json("Bin Request Added")
    }).catch((err)=>{
        console.log(err);
    })
  
}

const getAllBinRequests =async(req,res)=>{
    try {
        const AllbinRequest = await Item.find();
        res.json(AllbinRequest)
    } catch (error) {
        res.status(400).json(error)
    }
}
const getABinRequest = async(req,res)=>{
    let binRequestId = req.params.id;
    const user = await Item.findById(binRequestId)
    .then((binRequest)=>{
        res.json(binRequest);
    }).catch(()=>{
       
        res.status(500).send({status:"Error"});
    })
}

const updateBinRequest = async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const updatebinRequest = await Item.findByIdAndUpdate(
            id,
            {
                binRequestCompany:req?.body?.binRequestCompany,
                binRequestAddress:req?.body?.binRequestAddress,
                binRequestLocation:req?.body?.binRequestLocation,
                binRequestType:req?.body?.binRequestType,
                binRequestDescription:req?.body?.binRequestDescription,
              
            },
            {
                new:true,
            }
        );
        res.json(updatebinRequest)
    }catch(error){
         res.status(404).json(error)
    }
}

//Delete A Item
const deletebinRequest = async(req,res) =>{
    const {id} = req.params;
    try{
      const deletebinRequest = await Item.findByIdAndDelete(id);
      res.json({msg:'Bin Request Deleted Successfully!',deletebinRequest});
    }catch(error){
        res.status(402).json(error);
    }
}

const createAcceptedbinRequest = async(req,res)=>{
    const userId = req.body.userId;
    const binRequestCompany = req.body.binRequestCompany;
    const binRequestAddress = req.body.binRequestAddress;
    const binRequestLocation = req.body.binRequestLocation;
    const binRequestType = req.body.binRequestType;
    const binRequestDate = req.body.binRequestDate;
    const binRequestDescription = req.body.binRequestDescription;
 

    const binRequestPending = new AcceptedBinRerquest({
        userId,
        binRequestCompany,
        binRequestAddress,
        binRequestLocation,
        binRequestType,
        binRequestDate,
        binRequestDescription,

     
    })

    binRequestPending.save().then(()=>{
        res.json("Bin Request Added")
    }).catch((err)=>{
        console.log(err);
    })
  
}




const createRejectedbinRequest = async(req,res)=>{
    const userId = req.body.userId;
    const binRequestCompany = req.body.binRequestCompany;
    const binRequestAddress = req.body.binRequestAddress;
    const binRequestLocation = req.body.binRequestLocation;
    const binRequestType = req.body.binRequestType;
    const binRequestDate = req.body.binRequestDate;
    const binRequestDescription = req.body.binRequestDescription;
 

    const binRequestPending = new RejectedBinRerquest({
        userId,
        binRequestCompany,
        binRequestAddress,
        binRequestLocation,
        binRequestType,
        binRequestDate,
        binRequestDescription,

     
    })

    binRequestPending.save().then(()=>{
        res.json("Bin Request Added")
    }).catch((err)=>{
        console.log(err);
    })
  
}








const viewBinRequests = async(req,res) =>{

    AcceptedBinRerquest.find().then((accptedBinRequest)=>{
        res.json(accptedBinRequest)
    }).catch((err) =>{
        console.log(err)
    })
}




const viewRejectedBinRequests = async(req,res) =>{

    RejectedBinRerquest.find().then((accptedBinRequest)=>{
        res.json(accptedBinRequest)
    }).catch((err) =>{
        console.log(err)
    })
}


const viewBinRequest = async(req,res) =>{

    let Id = req.params.Id;
    const room = await AcceptedBinRerquest.findById(Id)
        .then((room) =>{
            res.json(room);
        }).catch((err) =>{
            console.log(err.message);
            res.status(500).send({status : "Error with get Request ", error: err.message});
        })
}




 const deleteBinRequest =async (req ,res)=>{
    let id = req.params.id;

    await  AcceptedBinRerquest.findByIdAndDelete(id)
        .then(()=> {
            res.status(200).send({status : "Request Removed"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with Delete Request", error: err.message});
    })
}

const deleteRejectedBinRequest =async (req ,res)=>{
    let id = req.params.id;

    await  RejectedBinRerquest.findByIdAndDelete(id)
        .then(()=> {
            res.status(200).send({status : "Request Removed"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with Delete Request", error: err.message});
    })
}












  



module.exports ={deleteRejectedBinRequest,viewRejectedBinRequests,createRejectedbinRequest,createAcceptedbinRequest,deleteBinRequest,viewBinRequests,viewBinRequest,createbinRequest,getAllBinRequests,getABinRequest,updateBinRequest,deletebinRequest};