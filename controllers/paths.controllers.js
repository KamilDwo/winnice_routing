'use strict';

const Paths = require('../models/paths.models');

exports.findAll = function (req, res) {
    Paths.findAll(function (err, news) {
        if (err)
            res.send(err);
        res.json(news);
    }, req.body);
};
