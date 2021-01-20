'use strict';

const Vineyard = require('../models/vineyard.models');

exports.findAll = function (req, res) {
    Vineyard.findAll(function (err, vineyard) {
        if (err)
            res.send(err);
        res.send(vineyard);
    });
};

exports.findById = function (req, res) {
    Vineyard.findById(req.params.id, function (err, vineyard) {
        if (err)
            res.send(err);
        res.json(vineyard);
    });
};
