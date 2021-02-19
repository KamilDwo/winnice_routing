'use strict'

const express = require('express')
const router = express.Router()
const newsController = require('../controllers/news.controllers')
const cors = require('cors')
const corsOptionsDelegate = require('../config/cors.config')

router.post('/', cors(corsOptionsDelegate), newsController.findAll)
router.post('/categories', cors(corsOptionsDelegate), newsController.findAllCategories)
router.get('/instagram', cors(corsOptionsDelegate), newsController.getInstagramPhotos)

module.exports = router
