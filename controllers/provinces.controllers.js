const Province = require('../models/provinces.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.getAllProvinces = (req, res) => {
    Province.getAllProvinces((data, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.json(data);
        }
    });
};
