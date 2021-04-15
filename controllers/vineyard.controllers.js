const Vineyard = require('../models/vineyard.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAll = (req, res) => {
    Vineyard.findAll((vineyard, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.findById = (req, res) => {
    Vineyard.findById(req.params.id, (vineyard, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(vineyard);
        }
    });
};
