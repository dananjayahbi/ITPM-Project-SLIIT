const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    binID: {
        type: String,
        required: true,
        unique: true
    },
    binName: {
        type: String,
        required: true
    },
    binLocation: {
        type: String,
        required: true
    },
    binOpenTime: {
        type: String,
        required: true
    },
    binCloseTime: {
        type: String,
        required: true
    }
});

const Bin = mongoose.model('Bin', binSchema);

module.exports = Bin;
