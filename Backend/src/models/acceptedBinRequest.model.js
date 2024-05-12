

const mongoose = require('mongoose');

 const AcceptedBinRequestSchema = new mongoose.Schema({
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
 const acceptedBinRequest = mongoose.model('accptedbinRequest', AcceptedBinRequestSchema);

 module.exports = acceptedBinRequest;

