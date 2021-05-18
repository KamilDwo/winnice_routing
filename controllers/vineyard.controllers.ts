const Vineyard = require('../models/vineyard.models');
import logSqlError from '../helpers/logSqlError.helper';

interface IFindAllResponse {
    status: (arg0: number) => void
    end: () => void
    json: (arg0: any) => void
}

interface IFindByIdReqParams {
    id: number
}

interface IFindByIdReq {
    params: IFindByIdReqParams
}

exports.findAll = (req: any, res: IFindAllResponse) => {
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Lists all vineyards'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = Lists all vineyards'
    Vineyard.findAll((vineyard: any, err: { sqlMessage: string; }) => {
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

exports.findById = (req: IFindByIdReq, res: IFindAllResponse) => {
    // #swagger.tags = ['Vineyards']
    // #swagger.description = 'Get specific vineyard by ID'
    // #swagger.summary = 'Get specific vineyard by ID'
    // #swagger.parameters['id'] = { in: 'path', type: 'number' }
    Vineyard.findById(req.params.id, (vineyard: any, err: { sqlMessage: string; }) => {
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
