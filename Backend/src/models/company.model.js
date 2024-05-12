const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName:{
        type:String,
        unique:true,
    },
    numberOfCenters:{
        type:Number
    },
    companySlogan:{
        type:String,
        required:false,
    },
    companyAbout:{
        type:String,
        required:false,
    }, 
    openHours:{
        type:String,
    }, 
    closeHours:{
        type:String, 
    },
    companyImage:{
        type:String, 
    },
    subscribedSellers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }],
    subscribedSellersCount: {
        type: Number,
        default: 0
    }    
},{
    timestamps:true,
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;