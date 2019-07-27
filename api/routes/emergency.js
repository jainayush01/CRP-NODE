const express = require('express');
const router = express.Router();
const Emergency = require('../model/emergency');
const response = require('../handler/response');
router.post('/add', addEmergency);
router.get('/getall', getEmergency);

module.exports = router;

async function addEmergency(_req, _res, _next) {
    try {

        const emergency = await Emergency.add(_req.body);

        console.log(emergency);

        response(_res, 201, "Item added.", emergency);
    } catch (err) {
        response(_res, 203, "Item not added.", err);
    }
};
async function getEmergency(req, res) {
    console.log(req.query);
    const { } = req.query;
    try {
        const emergency = await Emergency.allEmergencies();
        if (emergency)
            res.status(200).json({ message: 'Table found', data: emergency });
        else
            res.status(403).json({ message: 'Table not found :(', data: null });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error :(', data: error });
    }
};