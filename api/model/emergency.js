const mongoose = require('mongoose');

const Reason = [
    'Child Abuse',
    'Women Harrasment',
    'Robbery',
    'Murder',
    'Other',
];

const emergencytableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reason: {
        type: String,
        enum: Reason,
        default: 'any'
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }

});

const Emergency = mongoose.model('emergency', emergencytableSchema)

const add = record => {

    const { reason, name, mobile, address } = record;

    return new Emergency({
        _id: new mongoose.Types.ObjectId(),
        reason, name, mobile, address
    }).save();
}

const allEmergencies = () => {
    return Emergency.find();
}


module.exports = {add,allEmergencies};

