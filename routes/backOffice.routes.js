'use strict';

const express = require('express');
const router = express.Router();
const backOfficeController = require('../controllers/backOffice.controllers');
const cors = require('cors');
const corsOptionsDelegate = require('../config/cors.config');
const multer = require('multer')
const path = require('path')
const speakingurl = require('speakingurl')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, speakingurl(file.originalname, []) + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage})

router.get('/vineyards', cors(corsOptionsDelegate), backOfficeController.getAllVineyards);
router.post('/login', cors(corsOptionsDelegate), backOfficeController.loginAdmin);
router.get('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.getVineyardById);
router.post('/upload_photo', cors(corsOptionsDelegate), upload.single('photo'), (req, res, next) => {
    console.log(req.file);
    return res.json({
        ...req.file,
        file: 'dupa',
    });
});

module.exports = router;
