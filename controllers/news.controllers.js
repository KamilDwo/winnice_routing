const News = require('../models/news.models');

exports.findAll = function (req, res) {
    News.findAll((news, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
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

exports.findAllCategories = function (req, res) {
    News.findAllCategories((news, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
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


