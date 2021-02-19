'use strict';

const Vineyard = require('../models/vineyard.models');

exports.findAll = function (req, res) {
    Vineyard.findAll(function (vineyard, err) {
        if (err) {
            res.status(500)
            res.end()
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.findById = function (req, res) {
    Vineyard.findById(req.params.id, function (vineyard, err) {
        if (err) {
            res.status(500)
            res.end()
        }
        else {
            res.json(vineyard);
        }
    });
};
