const express = require('express');
const cors = require('cors');


const router = express.Router();


const vineyardController = require('../controllers/vineyard.controllers');
const corsOptionsDelegate = require('../config/cors.config');


router.post('/', cors(corsOptionsDelegate), vineyardController.findAll);
router.post('/:id', cors(corsOptionsDelegate), vineyardController.findById);

module.exports = router;
