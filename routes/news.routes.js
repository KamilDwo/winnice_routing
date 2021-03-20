const express = require('express');
const cors = require('cors');

const newsController = require('../controllers/news.controllers');
const corsOptionsDelegate = require('../config/cors.config');


const router = express.Router();


router.post('/', cors(corsOptionsDelegate), newsController.findAll);
router.post('/categories', cors(corsOptionsDelegate), newsController.findAllCategories);
router.post('/instagram', cors(corsOptionsDelegate), newsController.getInstagramPhotos);
router.post('/facebook', cors(corsOptionsDelegate), newsController.getFacebookNews);

module.exports = router;
