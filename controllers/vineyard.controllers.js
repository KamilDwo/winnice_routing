const Vineyard = require('../models/vineyard.models');
const logSqlError = require('../helpers/logSqlError.helper');


exports.findAll = (req, res) => {
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Lists all vineyards'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all vineyards'
    Vineyard.findAll((vineyard, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.json(vineyard);
        }
    });
};

exports.findById = (req, res) => {
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Get specific vineyard by ID'
    // #swagger.summary = 'Get specific vineyard by ID'
    // #swagger.parameters['id'] = { in: 'path', type: 'number' }
    Vineyard.findById(req.params.id, (vineyard, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.json(vineyard);
        }
    });
};
