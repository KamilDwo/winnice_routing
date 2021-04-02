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

exports.getAllNews = function (req, res) {
    BackOffice.getAllNews((news, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(news);
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

exports.getOrganizationById = function (req, res) {
    BackOffice.getOrganizationById(req.params.id, (response, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.json(response);
        }
    });
};

exports.getPathById = function (req, res) {
    BackOffice.getPathById(req.params.id, (response, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.json(response);
        }
    });
};

exports.getWineTypeById = function (req, res) {
    BackOffice.getWineTypeById(req.params.id, (response, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.json(response);
        }
    });
};

exports.deleteSpecificFile = function (req, res) {
    BackOffice.deleteSpecificFile(req, (response, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.json({
                type: 'ERROR', message: err.sqlMessage,
            });
        }
        else {
            res.json(response);
        }
    });
};

exports.deleteSpecificVineyard = function (req, res) {
    BackOffice.deleteSpecificVineyard(req, (response, err) => {
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

exports.deleteSpecificOrganization = function (req, res) {
    BackOffice.deleteSpecificOrganization(req, (response, err) => {
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

exports.deleteSpecificPath = function (req, res) {
    BackOffice.deleteSpecificPath(req, (response, err) => {
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

exports.deleteSpecificWineType = function (req, res) {
    BackOffice.deleteSpecificWineType(req, (response, err) => {
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

exports.updateOrganizationById = function (req, res) {
    BackOffice.updateOrganizationById(req, err => {
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

exports.updateWineTypeById = function (req, res) {
    BackOffice.updateWineTypeById(req, err => {
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

exports.updatePathById = function (req, res) {
    BackOffice.updatePathById(req, err => {
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

exports.createOrganization = function (req, res) {
    BackOffice.createOrganization(req, err => {
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

exports.createPath = function (req, res) {
    BackOffice.createPath(req, err => {
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

exports.createWineType = function (req, res) {
    BackOffice.createWineType(req, err => {
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
