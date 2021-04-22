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
        cb(null, 'public/upload');
    },
    filename (req, file, cb) {
        cb(null, `${speakingurl(file.originalname, [])}-${Date.now()}${path.extname(file.originalname)}`);
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
router.post('/GetRequiredData', cors(corsOptionsDelegate), backOfficeController.getAllRequiredData);
router.delete('/vineyards/:id', cors(corsOptionsDelegate), backOfficeController.deleteSpecificVineyard);
router.post('/organizations/new', cors(corsOptionsDelegate), backOfficeController.createOrganization);
router.post('/organizations/:id', cors(corsOptionsDelegate), backOfficeController.updateOrganizationById);
router.get('/organizations/:id', cors(corsOptionsDelegate), backOfficeController.getOrganizationById);
router.delete('/organizations/:id', cors(corsOptionsDelegate), backOfficeController.deleteSpecificOrganization);
router.get('/paths/:id', cors(corsOptionsDelegate), backOfficeController.getPathById);
router.delete('/paths/:id', cors(corsOptionsDelegate), backOfficeController.deleteSpecificPath);
router.post('/paths/new', cors(corsOptionsDelegate), backOfficeController.createPath);
router.post('/paths/:id', cors(corsOptionsDelegate), backOfficeController.updatePathById);
router.get('/wine_types/:id', cors(corsOptionsDelegate), backOfficeController.getWineTypeById);
router.delete('/wine_types/:id', cors(corsOptionsDelegate), backOfficeController.deleteSpecificWineType);
router.post('/wine_types/new', cors(corsOptionsDelegate), backOfficeController.createWineType);
router.post('/wine_types/:id', cors(corsOptionsDelegate), backOfficeController.updateWineTypeById);
router.get('/news', cors(corsOptionsDelegate), backOfficeController.getAllNews);
router.post('/GetCategoriesList', cors(corsOptionsDelegate), backOfficeController.getAllNewsCategories);
router.post('/GetNewsCategoryDetails', cors(corsOptionsDelegate), backOfficeController.getNewsCategoryById);
router.post('/EditNewsCategory', cors(corsOptionsDelegate), backOfficeController.editNewsCategoryById);
router.post('/CreateNewsCategory', cors(corsOptionsDelegate), backOfficeController.createNewsCategory);
router.post('/wines/GetWinesList', cors(corsOptionsDelegate), backOfficeController.getAllWines);
router.post('/wines/GetWineDetails', cors(corsOptionsDelegate), backOfficeController.getWineById);
router.post('/wines/EditWine', cors(corsOptionsDelegate), backOfficeController.updateWineById);

module.exports = router;
