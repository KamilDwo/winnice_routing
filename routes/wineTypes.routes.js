const express = require('express');
const cors = require('cors');

const router = express.Router();
const vineyardController = require('../controllers/wineTypes.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.post('/GetWineTypes', cors(corsOptionsDelegate), vineyardController.findAll);

module.exports = router;
