const { Router } = require("express");

const router = Router();

const { statusControllers } = require("../controllers/statuses.controllers");

router.post('/status', statusControllers.postStatus);
router.get('/status', statusControllers.getStatus)

module.exports = router;
