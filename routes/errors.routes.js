const express = require('express');
const cors = require('cors');

const router = express.Router();
const errorsController = require('../controllers/errors.controllers');
const corsOptionsDelegate = require('../config/cors.config');

router.post('/LogError', cors(corsOptionsDelegate), errorsController.saveToLog);

module.exports = router;
