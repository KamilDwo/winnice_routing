'use strict';

const News = require('../models/news.models');

exports.findAll = function (req, res) {
    News.findAll(function (err, news) {
        if (err)
            res.send(err);
        res.json(news);
    }, req.body);
};

exports.findAllCategories = function (req, res) {
    News.findAllCategories(function (err, news) {
        if (err)
            res.send(err);
        res.json(news);
    }, req.body);
};

exports.getInstagramPhotos = function (req, res) {
    News.getInstagramPhotos(function (err, news) {
        if (err)
            res.send(err);
        res.json(news);
    }, req.body);
};

