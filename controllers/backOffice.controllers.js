'use strict';

const BackOffice = require('../models/backoffice.models');

exports.getAllVineyards = function (req, res) {
    BackOffice.getAllVineyards(function (vineyards, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(vineyards);
        }
    });
};

exports.loginAdmin = function (req, res) {
    BackOffice.loginAdmin(function (token, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(token);
        }
    });
};

exports.uploadPhoto = function (req, res) {
    BackOffice.uploadPhoto(function (req, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(req);
        }
    });
};

exports.getVineyardById = function (req, res) {
    BackOffice.getVineyardById(req.params.id, function (vineyard, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(vineyard);
        }
    });
};
