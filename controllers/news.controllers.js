'use strict';

const News = require('../models/news.models')

exports.findAll = function (req, res) {
    News.findAll(function (news, err) {
        console.log(news, 'blad: ', err);
        if (err) {
            res.status(500)
            res.end()
        }
        else {
            res.json(news)
        }
    }, req.body)
}

exports.findAllCategories = function (req, res) {
    News.findAllCategories(function (news, err) {
        if (err) {
            res.status(500)
            res.end()
        }
        else {
            res.json(news)
        }
    }, req.body)
}

exports.getInstagramPhotos = function (req, res) {
    News.getInstagramPhotos(function (news, err) {
        if (err) {
            res.status(500)
            res.end()
        }
        else {
            console.log('got instagram photos2');
            res.json(news)
        }
    }, req.body)
}

