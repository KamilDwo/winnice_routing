'use strict';

const express = require('express');
const router = express.Router();
const backOfficeController = require('../controllers/backOffice.controllers');
const cors = require('cors');
const corsOptionsDelegate = require('../config/cors.config');

router.get('/vineyards', cors(corsOptionsDelegate), backOfficeController.getAllVineyards);
router.post('/login', cors(corsOptionsDelegate), backOfficeController.loginAdmin);
router.get('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.getVineyardById);
router.post('/upload_photo', cors(corsOptionsDelegate), (req, res, next) => {
    console.log(req);
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
        `${__dirname}/public/files/${fileName}`,
        function (err) {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({
                file: `public/${req.files.file.name}`,
            })
        },
    )
})

module.exports = router;
