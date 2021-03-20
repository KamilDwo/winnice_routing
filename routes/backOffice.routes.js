const express = require('express');
const cors = require('cors');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const speakingurl = require('speakingurl');
const corsOptionsDelegate = require('../config/cors.config');
const backOfficeController = require('../controllers/backOffice.controllers');


const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, 'public/images');
    },
    filename (req, file, cb) {
        cb(null, `${speakingurl(file.originalname, [])  }-${  Date.now()  }${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
});

router.get('/vineyards', cors(corsOptionsDelegate), backOfficeController.getAllVineyards);
router.post('/login', cors(corsOptionsDelegate), backOfficeController.loginAdmin);
router.get('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.getVineyardById);
router.post('/upload_photo', cors(corsOptionsDelegate), upload.single('photo'), backOfficeController.uploadVineyardImage);
router.post('/vineyards/new', cors(corsOptionsDelegate), backOfficeController.createVineyard);
router.post('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.updateVineyardById);
router.delete('/delete_file/:from', cors(corsOptionsDelegate), backOfficeController.deleteSpecificFile);
router.get('/get_data', cors(corsOptionsDelegate), backOfficeController.getAllRequiredData);
router.delete('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.deleteSpecificVineyard);

module.exports = router;
