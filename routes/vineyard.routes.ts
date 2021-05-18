import { router, corsOptions, cors } from "../server";

const vineyardController = require('../controllers/vineyard.controllers');

router.get('',  cors(corsOptions), vineyardController.findAll);
router.get('/:id', cors(corsOptions), vineyardController.findById);

module.exports = router;
