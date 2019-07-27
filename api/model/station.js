const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pincode: {
        type: Number,
        required: true,
        unique: true
    },
    stationName: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const StationModel = mongoose.model('Station', stationSchema);

const getStation = (pincode) => {
    const station = StationModel.findOne({ pincode });
    return station;
}
module.exports = { getStation };