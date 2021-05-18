import { router, corsOptions, cors } from "../server";
const newsController = require('../controllers/news.controllers');

router.get('/GetNewsList', cors(corsOptions), newsController.findAllNews);
router.get('/categories', cors(corsOptions), newsController.findAllCategories);
router.get('/instagram', cors(corsOptions), newsController.getInstagramPhotos);
router.get('/facebook', cors(corsOptions), newsController.getFacebookNews);
router.get('/GetNewsCategoriesList', cors(corsOptions), newsController.findAllCategories);

module.exports = router;
