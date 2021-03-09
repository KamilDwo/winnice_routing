'use strict';

const express = require('express');
const router = express.Router();
const backOfficeController = require('../controllers/backOffice.controllers');
const cors = require('cors');
const corsOptionsDelegate = require('../config/cors.config');

router.get('/vineyards', cors(corsOptionsDelegate), backOfficeController.getAllVineyards);
router.post('/login', cors(corsOptionsDelegate), backOfficeController.loginAdmin);
router.post('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.getVineyardById);

module.exports = router;
