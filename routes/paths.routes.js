const express = require('express');

const router = express.Router();
const pathsController = require('../controllers/paths.controllers');
const cors = require('cors');
const corsOptionsDelegate = require('../config/cors.config');

router.get('/', cors(corsOptionsDelegate), pathsController.findAll);

module.exports = router;
