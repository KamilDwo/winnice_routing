'use strict'

const {
    findAll,
    findAllCategories,
    getInstagramPhotos
} = require('../models/news.models')

exports.findAll = function (req, res) {
    findAll(function (err, news) {
        if (err)
            res.send(err)
        res.json(news)
    }, req.body)
}

exports.findAllCategories = function (req, res) {
    findAllCategories(function (err, news) {
        if (err)
            res.send(err)
        res.json(news)
    }, req.body)
}

exports.getInstagramPhotos = function (req, res) {
    getInstagramPhotos(function (err, news) {
        if (err)
            res.send(err)
        res.json(news)
    }, req.body)
}

