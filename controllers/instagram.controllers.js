'use strict'

const Instagram = require('../models/instagram.models');

exports.getPhotosByUsername = function (req, res) {
    Instagram.getPhotosByUsername(function (err, news) {
        if (err)
            res.send(err);
        res.json(news);
    }, req.body);
};
