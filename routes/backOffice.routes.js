'use strict';

const express = require('express');
const router = express.Router();
const backOfficeController = require('../controllers/backOffice.controllers');
const cors = require('cors');
const corsOptionsDelegate = require('../config/cors.config');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

        // You could use the original name
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage})

router.get('/vineyards', cors(corsOptionsDelegate), backOfficeController.getAllVineyards);
router.post('/login', cors(corsOptionsDelegate), backOfficeController.loginAdmin);
router.get('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.getVineyardById);
router.post('/upload_photo', cors(corsOptionsDelegate), upload.single('photo'), (req, res, next) => {
    console.log(`${__dirname}`);
    return res.json({
        image: req.file.path
    });
})

module.exports = router;
