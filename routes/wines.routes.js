const express = require('express');
const cors = require('cors');

const router = express.Router();
const winesController = require('../controllers/wines.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.post('/GetWines', cors(corsOptionsDelegate), winesController.findAll);

module.exports = router;
