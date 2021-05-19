const Province = require('../models/provinces.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.getProvinceById = (req, res) => {
    Province.getProvinceById(req.params.id,(data, err) => {
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
