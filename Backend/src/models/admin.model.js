const mongoose =require('mongoose');

const adminSchema = new mongoose.Schema({
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
    }
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;