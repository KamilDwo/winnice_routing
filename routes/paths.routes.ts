import { router, corsOptions, cors } from "../server";
const pathsController = require('../controllers/paths.controllers');

router.get('', cors(corsOptions), pathsController.findAll);

module.exports = router;
