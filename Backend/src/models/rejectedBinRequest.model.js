

const mongoose = require('mongoose');

 const RejectedBinRequestSchema = new mongoose.Schema({
    binRequestCompany:{
         type:String,
          
     },
     binRequestAddress:{
        type:String,
        
     },
     binRequestLocation:{
        type:String,
        
    },
    binRequestType:{
        type:String,
        
    
    },
    binRequestDate:{
        type:String,
        
    },
    binRequestDescription:{
        type:String,
        
    
    },


});
 const rejectedBinRequest = mongoose.model('rejectedbinRequest', RejectedBinRequestSchema);

 module.exports = rejectedBinRequest;

