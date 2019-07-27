const express = require('express');
const router = express.Router();

const Officer = require('../model/officer');
const response = require('../handler/response');
const {crypt, dcrypt} = require('../handler/encrypto');
const {token} = require('../handler/jwt');

router.post('/login', loginOfficer);
router.post('/logout', logoutOfficer);

module.exports = router;

async function loginOfficer(_req, _res, _next) {
    console.log(_req.body);
    
    const { userName, password } = _req.body;
    try {
        const officer = await Officer.getOfficer(userName);
        if (officer && password === officer.password) {
            const { _id, userName} = officer;

            const accessToken = token({ userName});
            const updateToken = await Officer.updateAccessToken({ userName }, accessToken);

            if (updateToken.nModified === 1)
                response(_res, 200, 'Officer Found', { userName: _id, accessToken });
            else throw new Error('DB Server Error');
        }
        else {
            response(_res, 200, 'Invalid id or password.');
        }
    }
    catch (err) {
        console.log(err);
        response(_res, 500, 'Server Error', { error: err });
    }
}

async function logoutOfficer(_req, _res, _next) {
    const _id = _req.headers.dbid;
    try {
        const updateToken = await Officer.updateAccessToken({ _id }, 0);
        if (updateToken.nModified === 1)
            response(_res, 200, 'Logout Success.', 0);
        else throw new Error('DB Server Error');
    } catch (err) {
        console.log(err);
        response(_res, 500, 'Server Error.', 0);
    }
}