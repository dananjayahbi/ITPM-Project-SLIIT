const mongoose =require('mongoose');

const sellerSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    creditsBalance:{
        type:Number,
        default:0
    },
    boughtItems: [
        {
            item: {type:mongoose.Schema.Types.ObjectId,ref:'Item'},
            quantity: {type:Number},
            date: {type:Date}
        }
    ],
    activityHistory: [
        {
            actionId: {type:mongoose.Schema.Types.ObjectId},
            type: {
                type:String,
                enum: ['earning', 'spend']
            },
            amount: {type:Number},
            date: {type:Date}
        }
    ],
    subscribeToCompany: {type:mongoose.Schema.Types.ObjectId, ref:'Company', default:null}
});

const Seller = mongoose.model('Seller',sellerSchema);

module.exports = Seller;