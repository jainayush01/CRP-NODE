const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

const station = require('./api/routes/station');
const officer = require('./api/routes/officer');
const emergencytable = require('./api/routes/emergency');
const crime = require('./api/routes/crime');
const fir = require('./api/routes/fir');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/station', station);
app.use('/officer',officer);
app.use('/emergency',emergencytable)
app.use('/crime', crime);
app.use('/fir',fir);

//handling errors...
app.use((_req, _res, _next) => {
    console.log(_req.body);
    const error = new Error('Not Found!');
    error.status = 404;
    _next(error);
});

app.use((error, _req, _res, _next) => {
    _res.status(error.status || 500)
        .json({
            code: error.status || 500,
            message: 'Server Not Responding ...',
            error: error.message
        });
});

module.exports = app;
