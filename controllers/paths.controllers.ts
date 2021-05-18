const Paths = require('../models/paths.models');
import logSqlError from '../helpers/logSqlError.helper';

exports.findAll = (req: { body: any; }, res: { status: (arg0: number) => void; end: () => void; json: (arg0: any) => void; }) => {
    // #swagger.tags = ['Paths']
    // #swagger.description = 'Lists all paths'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all paths'
    Paths.findAll((news: any, err: { sqlMessage: any; }) => {
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
