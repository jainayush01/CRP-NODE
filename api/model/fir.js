const mongoose = require('mongoose');

const Status = [
    'Complaint Registered',
    'Reviewed By Officer',
    'Action Taken',
    'File Closed',
];

const firtableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: Status,
        default: 'any'
    },
    registerationid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // chooseafile: {
    //     type: String,
    //     required: true
    // },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },

});

const Fir = mongoose.model('fir', firtableSchema)

const add = record => {

    const { status, registerationid, name, email, mobile, description, address, city, state, pincode } = record;

    return new Fir({
        _id: new mongoose.Types.ObjectId(),
        status, registerationid, name, email, mobile, description, address, city, state, pincode

    }).save();
}

const allFir = () => {
    return Fir.find();
}
const getFir=(registerationid)=>{
    return Fir.findOne({registerationid})
}
const updateStatus=(reportId,status)=>{
    return Fir.updateOne({registerationid:reportId},{$set:{status}})
}

module.exports = { add,allFir,updateStatus,getFir};

