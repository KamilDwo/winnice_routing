const Wine = require('../models/wines.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAll = (req, res) => {
    Wine.findAll((wineType, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(wineType);
        }
    });
};
