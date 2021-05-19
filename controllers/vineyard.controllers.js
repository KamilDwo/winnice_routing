const Vineyard = require('../models/vineyard.models');
const logSqlError = require('../helpers/logSqlError.helper');
const mCache = require('memory-cache');

exports.findAll = (req, res) => {
    const cacheKey = mCache.get(`_express_findAll_${req.originalUrl || req.url}`);
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Lists all vineyards'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all vineyards'
    if (cacheKey) {
        console.log("mamy cache");
        res.status(200);
        res.json(cacheKey);
    }
    else {
        Vineyard.findAll((data, err) => {
            console.log("nie mamy cache");
            if (err) {
                logSqlError(err.sqlMessage);
                res.status(500);
                res.end();
            }
            else {
                mCache.put(cacheKey, data, 10 * 1000);
                res.status(200);
                res.json(data);
            }
        });
    }
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
