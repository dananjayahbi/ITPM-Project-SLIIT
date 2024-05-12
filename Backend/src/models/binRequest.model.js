

const mongoose = require('mongoose');

 const BinRequestSchema = new mongoose.Schema({
    binRequestCompany:{
         type:String,
          
     },
     binRequestAddress:{
        type:String,
        required:true,
     },
     binRequestLocation:{
        type:String,
        required:true,
    },
    binRequestType:{
        type:String,
        required:true,
    
    },
    binRequestDate:{
        type:String,
        required:true,
    
    },
    binRequestDescription:{
        type:String,
        required:true,
    
    },


});
 const binRequest = mongoose.model('binRequest', BinRequestSchema);

 module.exports = binRequest;

