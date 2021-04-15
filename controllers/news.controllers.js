const News = require('../models/news.models');
const logSqlError = require('../helpers/logSqlError.helper');

exports.findAllNews = (req, res) => {
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


