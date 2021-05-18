import { router, corsOptions, cors } from "../server";
const newsController = require('../controllers/news.controllers');

router.post('/GetNewsList', cors(corsOptions), newsController.findAllNews);
router.post('/categories', cors(corsOptions), newsController.findAllCategories);
router.post('/instagram', cors(corsOptions), newsController.getInstagramPhotos);
router.post('/facebook', cors(corsOptions), newsController.getFacebookNews);
router.post('/GetNewsCategoriesList', cors(corsOptions), newsController.findAllCategories);

module.exports = router;
