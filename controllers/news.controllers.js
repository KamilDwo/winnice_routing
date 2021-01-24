'use strict';

const News = require('../models/news.models');

exports.findAll = function (req, res) {
    News.findAll(function (err, news) {
        if (err)
            res.send(err);
        res.json(news);
    }, req.body);
};
