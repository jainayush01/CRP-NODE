const express = require('express');
const router = express.Router();
const Fir = require('../model/fir');
const response = require('../handler/response');
router.post('/add', addFir);
router.get('/getall', getAllFir);
router.post('/updateStatus', updateStatus);
router.get('/getFir', getFir);

module.exports = router;

async function addFir(_req, _res, _next) {
    _req.body.registerationid = new Date().getTime();
    try {
        console.log(_req.body);
        const fir = await Fir.add(_req.body);
        response(_res, 201, "Item added.", fir);
    } catch (err) {
        console.log(err);
        response(_res, 203, "Item not added.", err);
    }
};
async function getAllFir(req, res) {
    try {
        const fir = await Fir.allFir();
        if (fir)
            res.status(200).json({ message: 'Table found', data: fir });
        else
            res.status(403).json({ message: 'Table not found :(', data: null });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error :(', data: error });
    }
};
async function updateStatus(req, res) {
    const { reportId, status } = req.body;
    try {
        const updatedStatus = await Fir.updateStatus(reportId, status);
        console.log(updatedStatus)
        response(res, 201, "Status updated", updatedStatus)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error :(', data: error });
    }
}
async function getFir(req, res) {
    console.log(req.query);

    const { registerationid } = req.query;
    try {
        const find = await Fir.getFir(registerationid);
        console.log(find);
        response(res, 200, "Fir Found", find)


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error :(', data: error });
    }
}