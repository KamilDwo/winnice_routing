const News = require('../models/news.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAllNews = (req, res) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Lists all news'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all news'
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

exports.findAllCategories = (req, res) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Lists all news categories'
    /* #swagger.responses[200] = {
    } */
    // #swagger.summary = 'Lists all news categories'
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

exports.getInstagramPhotos = function (req, res) {
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

exports.getFacebookNews = function (req, res) {
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


