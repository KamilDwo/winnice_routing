'use strict'

const express = require('express')
const router = express.Router()
const cors = require('cors')
const corsOptionsDelegate = require('../config/cors.config')
const instagramController = require('../controllers/instagram.controllers')

router.post('/', cors(corsOptionsDelegate), instagramController.getPhotosByUsername);

module.exports = router
