const express = require('express');
const router = express.Router();
const Crime = require('../model/crime');
const response = require('../handler/response');
//const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './upload/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
//         cb(null, true);
//     cb(null, false);
// }
// const upload = multer({
//     storage,
//     limits: { fileSize: 1024 * 1024 * 5 },
//     fileFilter
// });



router.post('/add',addCrime);
router.get('/getall', getCrime);

module.exports = router;


async function addCrime(_req, _res, _next) {
   console.log('vewfvewfewf');
    try {

        const crime = await Crime.add(_req.body);

        console.log('jhfhjf', crime);

        response(_res, 201, "Data added.", crime);
    } catch (err) {
        response(_res, 203, "Data not added.", err);
    }
};
async function getCrime(req, res) {
    console.log(req.query);
    const { } = req.query;
    try {
        const crime = await CRIME.allcrimes();
        if (crime)
            res.status(200).json({ message: 'Table found', data: crime });
        else
            res.status(403).json({ message: 'Table not found :(', data: null });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error :(', data: error });
    }
};
