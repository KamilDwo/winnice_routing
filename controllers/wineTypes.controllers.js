const WineType = require('../models/wineTypes.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAll = (req, res) => {
    WineType.findAll((wineType, err) => {
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
