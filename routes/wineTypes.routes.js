const express = require('express');
const cors = require('cors');

const router = express.Router();
const wineTypesController = require('../controllers/wineTypes.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.post('/GetWineTypes', cors(corsOptionsDelegate), wineTypesController.findAll);

module.exports = router;
