const BackOffice = require('../models/backoffice.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.getAllVineyards = (req, res) => {
    BackOffice.getAllVineyards((vineyards, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(vineyards);
        }
    });
};

exports.getAllWines = (req, res) => {
    BackOffice.getAllWines((data, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(data);
        }
    });
};

exports.getAllNews = (req, res) => {
    BackOffice.getAllNews((news, err) => {
        if (err) {
            res.json(logSqlError(err.sqlMessage));
        }
        else {
            res.json(news);
        }
    });
};

exports.getAllNewsCategories = (req, res) => {
    BackOffice.getAllNewsCategories(req, (news, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(news);
        }
    });
};

exports.getNewsCategoryById = (req, res) => {
    BackOffice.getNewsCategoryById(req.body.data, (data, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(data);
        }
    });
};

exports.editNewsCategoryById = (req, res) => {
    BackOffice.editNewsCategoryById(req.body, (data, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(data);
        }
    });
};

exports.getAllRequiredData = (req, res) => {
    BackOffice.getAllRequiredData((data, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(data);
        }
    });
};

exports.loginAdmin = (req, res) => {
    BackOffice.loginAdmin(req,(token, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(token);
        }
    });
};

exports.getVineyardById = (req, res) => {
    BackOffice.getVineyardById(req.params.id, (vineyard, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
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

exports.getOrganizationById = (req, res) => {
    BackOffice.getOrganizationById(req.params.id, (response, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
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

exports.getPathById = (req, res) => {
    BackOffice.getPathById(req.params.id, (response, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
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

exports.getWineTypeById = (req, res) => {
    BackOffice.getWineTypeById(req.params.id, (response, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
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

exports.updateOrganizationById = (req, res) => {
    BackOffice.updateOrganizationById(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    });
};

exports.updateWineTypeById = (req, res) => {
    BackOffice.updateWineTypeById(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    });
};

exports.updateWineById = (req, res) => {
    BackOffice.updateWineById(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.json({
                'error': err.sqlMessage,
            });
        }
        else {
            res.json({
                'response': 'success',
            });
        }
    });
};

exports.getWineById = (req, res) => {
    BackOffice.getWineById(req.body.data.id, (wine, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.json({
                'error': err.sqlMessage,
            });
        }
        else {
            res.json(wine[0]);
        }
    });
};

exports.updatePathById = (req, res) => {
    BackOffice.updatePathById(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
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

exports.createNewsCategory = (req, res) => {
    BackOffice.createNewsCategory(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
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

exports.createVineyard = (req, res) => {
    BackOffice.createVineyard(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    });
};

exports.createWine = (req, res) => {
    BackOffice.createWine(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.json({
                'error': err.sqlMessage,
            });
        }
        else {
            res.json({
                'response': 'success',
            });
        }
    });
};

exports.createWineType = (req, res) => {
    BackOffice.createWineType(req, err => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    });
};
