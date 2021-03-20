const BackOffice = require('../models/backoffice.models');


exports.getAllVineyards = function (req, res) {
    BackOffice.getAllVineyards((vineyards, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(vineyards);
        }
    });
};

exports.getAllRequiredData = function (req, res) {
    BackOffice.getAllRequiredData((data, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(data);
        }
    });
};

exports.loginAdmin = function (req, res) {
    BackOffice.loginAdmin((token, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(token);
        }
    });
};

exports.getVineyardById = function (req, res) {
    BackOffice.getVineyardById(req.params.id, (vineyard, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.deleteSpecificFile = function (req, res) {
    BackOffice.deleteSpecificFile(req, (vineyard, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.deleteSpecificVineyard = function (req, res) {
    BackOffice.deleteSpecificVineyard(req, (vineyard, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.status(200);
            res.end();
        }
    });
};

exports.uploadVineyardImage = function (req, res) {
    BackOffice.uploadVineyardImage(req, (file, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(file);
        }
    });
};

exports.updateVineyardById = function (req, res) {
    BackOffice.updateVineyardById(req, err => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    });
};

exports.createVineyard = function (req, res) {
    BackOffice.createVineyard(req, err => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    });
};
