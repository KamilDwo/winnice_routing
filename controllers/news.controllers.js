'use strict';

const News = require('../models/news.models')

exports.findAll = function (req, res) {
    News.findAll(function (err, news) {
         console.log('mamy blad', err, 'newsy: ', news);
        if (err) {
            res.status(err.status || 500)
            res.end()
        }
        else {
            res.json(news)
        }
    }, req.body)
}

exports.findAllCategories = function (req, res) {
    News.findAllCategories(function (err, news) {
        if (err) {
            res.status(err.status || 500)
            res.end()
        }
        else {
            res.json(news)
        }
    }, req.body)
}

exports.getInstagramPhotos = function (req, res) {
    News.getInstagramPhotos(function (err, news) {
        if (err) {
            res.status(err.status || 500)
            res.end()
        }
        else {
            console.log('got instagram photos2');
            res.json(news)
        }
    }, req.body)
}

