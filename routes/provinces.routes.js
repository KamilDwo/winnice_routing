const express = require('express');
const cors = require('cors');

const router = express.Router();
const provinceController = require('../controllers/provinces.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.get('', cors(corsOptionsDelegate), provinceController.getAllProvinces);

module.exports = router;
