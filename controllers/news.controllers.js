'use strict';

const News = require('../models/news.models')

exports.findAll = function (req, res) {
    News.findAll(function (news, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage)
            res.status(500).json({ error: err.sqlMessage })
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
            console.log('~~[MySQL error]~~ ', err.sqlMessage)
            res.status(500).json({ error: err.sqlMessage })
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
            console.log('~~[MySQL error]~~ ', err.error.message)
            res.status(500).json({ error: err.error.message })
            res.end()
        }
        else {
            res.status(200)
            res.end()
        }
    }, req.body)
}

exports.getFacebookNews = function (req, res) {
    News.getFacebookNews(function (news, err) {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.error.message)
            res.status(500).json({ error: err.error.message })
            res.end()
        }
        else {
            res.status(200)
            res.end()
        }
    }, req.body)
}


