'use strict';

const Paths = require('../models/paths.models');

exports.findAll = function (req, res) {
    Paths.findAll(function (news, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500)
            res.end()
        }
        else {
            res.json(news);
        }
    }, req.body);
};
