const Paths = require('../models/paths.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAll = (req, res) => {
    // #swagger.tags = ['Paths']
    // #swagger.description = 'Lists all paths'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all paths'
    Paths.findAll((news, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.json(news);
        }
    }, req.body);
};
