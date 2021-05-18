const Vineyard = require('../models/vineyard.models');
const logSqlError = require('../helpers/logSqlError.helper');

interface IRes {
    status: (arg0: number) => void; end: () => void; json: (arg0: any) => void;
}

exports.findAll = (req: any, res: IRes) => {
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Lists all vineyards'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = Lists all vineyards'
    Vineyard.findAll((vineyard: any, err: { sqlMessage: any; }) => {
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

exports.findById = (req: { params: { id: any; }; }, res: { status: (arg0: number) => void; end: () => void; json: (arg0: any) => void; }) => {
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Get specific vineyard by ID'
    // #swagger.summary = 'Get specific vineyard by ID'
    // #swagger.parameters['id'] = { in: 'path', type: 'number' }
    Vineyard.findById(req.params.id, (vineyard: any, err: { sqlMessage: any; }) => {
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
