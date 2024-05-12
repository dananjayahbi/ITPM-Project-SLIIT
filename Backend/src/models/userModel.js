const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String, enum: ['seller','admin','company'], default: 'seller' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;