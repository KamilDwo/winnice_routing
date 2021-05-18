const News = require('../models/news.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAllNews = (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; end: () => void; json: (arg0: any) => void; }) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Lists all news'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all news'
    // @ts-ignore
    News.findAllNews((news, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500).json({
                error: err.sqlMessage,
            });
            res.end();
        }
        else {
            res.json(news);
        }
    }, req.body);
};

exports.findAllCategories = (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; end: () => void; json: (arg0: any) => void; }) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Lists all news categories'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all news categories'
    // @ts-ignore
    News.findAllCategories((data, err) => {
        if (err) {
            logSqlError(err.sqlMessage);
            res.status(500).json({
                error: err.sqlMessage,
            });
            res.end();
        }
        else {
            res.json(data);
        }
    }, req.body);
};

exports.getInstagramPhotos = function (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; end: () => void; }) {
    // @ts-ignore
    News.getInstagramPhotos((news, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.error.message);
            res.status(500).json({
                error: err.error.message,
            });
            res.end();
        }
        else {
            res.status(200);
            res.end();
        }
    }, req.body);
};

exports.getFacebookNews = function (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; end: () => void; json: (arg0: any) => void; }) {
    // @ts-ignore
    News.getFacebookNews((news, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.error.message);
            res.status(500).json({
                error: err.error.message,
            });
            res.end();
        }
        else {
            res.json(news);
        }
    }, req.body);
};


