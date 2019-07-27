const mongoose = require('mongoose');
const { crypt } = require('../handler/encrypto');

const officerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
});

const Officer = mongoose.model('Officer', officerSchema);

const getOfficer = userName => {
    return userName ? Officer.findOne({ userName }) : Officer.find();
};

const updateAccessToken = (condition, token) => {
    return Officer.updateOne(condition, { $set: { accessToken: token } })
}

module.exports = { getOfficer, updateAccessToken };
