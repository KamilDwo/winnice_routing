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

exports.getAllRequiredData = function (req, res) {
    BackOffice.getAllRequiredData(function (data, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(data);
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

exports.getVineyardById = function (req, res) {
    BackOffice.getVineyardById(req.params.id, function (vineyard, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.json({ type: 'ERROR', message: err.sqlMessage });
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.deleteSpecificFile = function (req, res) {
    BackOffice.deleteSpecificFile(req, function (vineyard, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.json({ type: 'ERROR', message: err.sqlMessage });
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.uploadVineyardImage = function (req, res) {
    BackOffice.uploadVineyardImage(req, function (file, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(file);
        }
    });
};

exports.updateVineyardById = function (req, res) {
    BackOffice.updateVineyardById(req, function (err, vineyard) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.status(200)
            res.end()
        }
    });
};
