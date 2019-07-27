const express = require('express');
const router = express.Router();

const STATION = require('../model/station');


router.get('/kys', async (req, res) => {
    console.log(req.query);
    const { pincode } = req.query;
    try {
        const station = await STATION.getStation(pincode);
        if (station)
            res.status(200).json({ message: 'station found', data: station });
        else
            res.status(404).json({ message: 'Station not found :(', data: null });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error :(', data: error });
    }
});

module.exports = router;