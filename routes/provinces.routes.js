const express = require('express');
const cors = require('cors');

const router = express.Router();
const provinceController = require('../controllers/provinces.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.get('/:id', cors(corsOptionsDelegate), provinceController.getProvinceById);

module.exports = router;
