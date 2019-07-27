const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description:{
        type:String,
        required: true
    }
});


const Crime = mongoose.model('crime', crimeSchema)

const add = record => {

    const { description} = record;

    return new Crime({
        _id: new mongoose.Types.ObjectId(),
        description
    }).save();
}

const allCrimes = () => {
    return Crime.find();
}


module.exports = {add,allCrimes};

