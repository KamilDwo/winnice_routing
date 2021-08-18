const express = require('express');
const cors = require('cors');

const router = express.Router();
const vineyardController = require('../controllers/vineyard.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.get('/GetVineyardsList', cors(corsOptionsDelegate), vineyardController.findAll);
router.get('/:id', cors(corsOptionsDelegate), vineyardController.findById);

module.exports = router;
